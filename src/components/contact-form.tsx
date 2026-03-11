"use client"

import { Turnstile } from "@marsidev/react-turnstile"
import { useLocale, useTranslations } from "next-intl"
import { useActionState, useRef, useState } from "react"
import { type ContactFormState, submitContactForm } from "@/app/[locale]/(site)/contact/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  const locale = useLocale()
  const [state, formAction, isPending] = useActionState<ContactFormState, FormData>(submitContactForm, {
    success: false,
  })
  const formRef = useRef<HTMLFormElement>(null)
  const [dismissed, setDismissed] = useState(false)
  const t = useTranslations("contact.form")

  if (state.success && !dismissed) {
    return (
      <div
        aria-live="polite"
        className="surface-panel rounded-[1.75rem] border-primary/15 bg-primary/5 px-6 py-8 text-center"
      >
        <p className="font-medium text-foreground">{t("success")}</p>
        <p className="mt-1 text-muted-foreground text-sm">{t("successDetail")}</p>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="mt-4 text-muted-foreground text-sm underline underline-offset-4 transition-colors hover:text-foreground"
        >
          {t("sendAnother")}
        </button>
      </div>
    )
  }

  return (
    <form ref={formRef} action={formAction} className="surface-panel space-y-6 p-6 sm:p-8">
      <input type="hidden" name="locale" value={locale} />
      <div>
        <label htmlFor="name" className="font-medium text-sm">
          {t("name")}
        </label>
        <Input
          id="name"
          type="text"
          name="name"
          autoComplete="name"
          placeholder={t("namePlaceholder")}
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
          {t("email")}
        </label>
        <Input
          id="email"
          type="email"
          name="email"
          autoComplete="email"
          spellCheck={false}
          placeholder={t("emailPlaceholder")}
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
          {t("message")}
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder={t("messagePlaceholder")}
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

      <Button type="submit" size="lg" disabled={isPending} className="w-full sm:w-auto">
        {isPending ? t("sending") : t("send")}
      </Button>
    </form>
  )
}
