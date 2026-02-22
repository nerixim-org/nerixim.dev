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
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    }
  }

  const webhookUrl = process.env.SLACK_WEBHOOK_URL
  if (!webhookUrl) {
    console.error("SLACK_WEBHOOK_URL is not set")
    return {
      success: false,
      error: "Contact form is not configured. Please try again later.",
    }
  }

  try {
    console.log("Sending message to Slack", { webhookUrl, parsedData: JSON.stringify(parsed.data) })
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
      console.error("Slack webhook failed", JSON.stringify(await response.text(), null, 2))
      throw new Error("Slack webhook failed")
    }

    return { success: true }
  } catch (error) {
    console.error("Failed to send message", JSON.stringify(error, null, 2))
    return {
      success: false,
      error: "Failed to send message. Please try again.",
    }
  }
}
