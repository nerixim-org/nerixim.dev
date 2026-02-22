"use server"

import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export type ContactFormState = {
  success: boolean
  error?: string
  fieldErrors?: Record<string, string[]>
}

export async function submitContactForm(_prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  })

  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const webhookUrl = process.env.SLACK_WEBHOOK_URL
  if (!webhookUrl) {
    return {
      success: false,
      error: "Contact form is not configured. Please try again later.",
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
              text: `Contact form: ${parsed.data.name}`,
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
      throw new Error("Slack webhook failed")
    }

    return { success: true }
  } catch {
    return {
      success: false,
      error: "Failed to send message. Please try again.",
    }
  }
}
