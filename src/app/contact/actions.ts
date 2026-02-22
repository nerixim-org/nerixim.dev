"use server"

import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

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
  const rawValues = {
    name: (formData.get("name") as string) ?? "",
    email: (formData.get("email") as string) ?? "",
    message: (formData.get("message") as string) ?? "",
  }

  const turnstileToken = formData.get("cf-turnstile-response") as string
  if (process.env.TURNSTILE_SECRET_KEY) {
    if (!turnstileToken) {
      return {
        success: false,
        error: "Spam verification failed. Please try again.",
        values: rawValues,
      }
    }

    const verified = await verifyTurnstile(turnstileToken)
    if (!verified) {
      return {
        success: false,
        error: "Spam verification failed. Please try again.",
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
      error: "Contact form is not configured. Please try again later.",
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
              text: `nerixim.dev contact form submission from ${parsed.data.name}`,
            },
          },
          {
            type: "section",
            fields: [
              { type: "mrkdwn", text: `*Name:*\n${parsed.data.name}` },
              { type: "mrkdwn", text: `*Email:*\n${parsed.data.email}` },
            ],
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Message:*\n${parsed.data.message}`,
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
      error: "Failed to send message. Please try again.",
      values: rawValues,
    }
  }
}
