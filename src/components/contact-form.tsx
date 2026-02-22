"use client"

import { Turnstile } from "@marsidev/react-turnstile"
import { useActionState, useRef } from "react"
import { type ContactFormState, submitContactForm } from "@/app/contact/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  const [state, formAction, isPending] = useActionState<ContactFormState, FormData>(submitContactForm, {
    success: false,
  })
  const formRef = useRef<HTMLFormElement>(null)

  if (state.success) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 px-6 py-8 text-center dark:border-green-900 dark:bg-green-950">
        <p className="font-medium text-green-900 dark:text-green-100">Message sent!</p>
        <p className="mt-1 text-green-700 text-sm dark:text-green-300">I&rsquo;ll get back to you soon.</p>
      </div>
    )
  }

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <div>
        <label htmlFor="name" className="font-medium text-sm">
          Name
        </label>
        <Input
          id="name"
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Your name…"
          defaultValue={state.values?.name}
          required
          className="mt-1.5"
        />
        {state.fieldErrors?.name && (
          <p className="mt-1 text-destructive text-sm" role="alert">
            {state.fieldErrors.name[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="font-medium text-sm">
          Email
        </label>
        <Input
          id="email"
          type="email"
          name="email"
          autoComplete="email"
          spellCheck={false}
          placeholder="you@example.com…"
          defaultValue={state.values?.email}
          required
          className="mt-1.5"
        />
        {state.fieldErrors?.email && (
          <p className="mt-1 text-destructive text-sm" role="alert">
            {state.fieldErrors.email[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="font-medium text-sm">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell me about your project…"
          defaultValue={state.values?.message}
          rows={6}
          required
          className="mt-1.5"
        />
        {state.fieldErrors?.message && (
          <p className="mt-1 text-destructive text-sm" role="alert">
            {state.fieldErrors.message[0]}
          </p>
        )}
      </div>

      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && <Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} />}

      {state.error && (
        <p className="text-destructive text-sm" role="alert">
          {state.error}
        </p>
      )}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Sending…" : "Send Message"}
      </Button>
    </form>
  )
}
