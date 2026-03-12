"use server"

import { z } from "zod"
import { type Locale, routing } from "@/i18n/routing"
import enMessages from "../../../../../messages/en.json"
import jaMessages from "../../../../../messages/ja.json"
import ruMessages from "../../../../../messages/ru.json"
import ukMessages from "../../../../../messages/uk.json"

const contactFormMessages = {
  en: enMessages.contact.form,
  ja: jaMessages.contact.form,
  ru: ruMessages.contact.form,
  uk: ukMessages.contact.form,
} as const

function isLocale(value: string | null): value is Locale {
  return value !== null && routing.locales.includes(value as Locale)
}

function getContactMessages(locale: Locale) {
  return contactFormMessages[locale]
}

function createContactSchema(messages: ReturnType<typeof getContactMessages>) {
  return z.object({
    name: z.string().min(2, messages.errors.nameTooShort).max(100, messages.errors.nameTooLong),
    email: z.email(messages.errors.invalidEmail).max(254, messages.errors.emailTooLong),
    message: z.string().min(10, messages.errors.messageTooShort).max(5000, messages.errors.messageTooLong),
  })
}

export type ContactFormState = {
  success: boolean
  error?: string
  fieldErrors?: Record<string, string[]>
  values?: { name: string; email: string; message: string }
}

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    return true
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
  })

  const data = (await response.json()) as { success: boolean }
  return data.success
}

export async function submitContactForm(_prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const localeValue = formData.get("locale") as string | null
  const locale = isLocale(localeValue) ? localeValue : routing.defaultLocale
  const messages = getContactMessages(locale)
  const rawValues = {
    name: (formData.get("name") as string) ?? "",
    email: (formData.get("email") as string) ?? "",
    message: (formData.get("message") as string) ?? "",
  }
  const contactSchema = createContactSchema(messages)

  const turnstileToken = formData.get("cf-turnstile-response") as string
  if (process.env.TURNSTILE_SECRET_KEY) {
    if (!turnstileToken) {
      return {
        success: false,
        error: messages.errors.spamVerificationFailed,
        values: rawValues,
      }
    }

    const verified = await verifyTurnstile(turnstileToken)
    if (!verified) {
      return {
        success: false,
        error: messages.errors.spamVerificationFailed,
        values: rawValues,
      }
    }
  }

  const parsed = contactSchema.safeParse(rawValues)

  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
      values: rawValues,
    }
  }

  const webhookUrl = process.env.SLACK_WEBHOOK_URL
  if (!webhookUrl) {
    console.error("SLACK_WEBHOOK_URL is not set")
    return {
      success: false,
      error: messages.errors.notConfigured,
      values: rawValues,
    }
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "nerixim.dev contact form submission",
            },
          },
          {
            type: "section",
            fields: [
              { type: "plain_text", text: `Name:\n${parsed.data.name}` },
              { type: "plain_text", text: `Email:\n${parsed.data.email}` },
            ],
          },
          {
            type: "section",
            text: {
              type: "plain_text",
              text: `Message:\n${parsed.data.message}`,
            },
          },
        ],
      }),
    })

    if (!response.ok) {
      console.error("Slack webhook failed", await response.text())
      throw new Error("Slack webhook failed")
    }

    return { success: true }
  } catch (error) {
    console.error("Failed to send message", error)
    return {
      success: false,
      error: messages.errors.sendFailed,
      values: rawValues,
    }
  }
}
