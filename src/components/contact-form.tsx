"use client"

import { useActionState } from "react"
import { type ContactFormState, submitContactForm } from "@/app/contact/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  const [state, formAction, isPending] = useActionState<ContactFormState, FormData>(submitContactForm, {
    success: false,
  })

  if (state.success) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 px-6 py-8 text-center dark:border-green-900 dark:bg-green-950">
        <p className="font-medium text-green-900 dark:text-green-100">Message sent!</p>
        <p className="mt-1 text-green-700 text-sm dark:text-green-300">I&rsquo;ll get back to you soon.</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="name" className="font-medium text-sm">
          Name
        </label>
        <Input id="name" type="text" name="name" placeholder="Your name" required className="mt-1.5" />
        {state.fieldErrors?.name && <p className="mt-1 text-destructive text-sm">{state.fieldErrors.name[0]}</p>}
      </div>

      <div>
        <label htmlFor="email" className="font-medium text-sm">
          Email
        </label>
        <Input id="email" type="email" name="email" placeholder="your@email.com" required className="mt-1.5" />
        {state.fieldErrors?.email && <p className="mt-1 text-destructive text-sm">{state.fieldErrors.email[0]}</p>}
      </div>

      <div>
        <label htmlFor="message" className="font-medium text-sm">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell me about your project..."
          rows={6}
          required
          className="mt-1.5"
        />
        {state.fieldErrors?.message && <p className="mt-1 text-destructive text-sm">{state.fieldErrors.message[0]}</p>}
      </div>

      {state.error && <p className="text-destructive text-sm">{state.error}</p>}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Sending..." : "Send message"}
      </Button>
    </form>
  )
}
