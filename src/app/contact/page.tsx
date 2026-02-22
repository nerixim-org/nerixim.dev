import type { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about development, consulting, or collaboration.",
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 md:py-24">
      <h1 className="font-heading font-semibold text-3xl">Get in touch</h1>
      <p className="mt-2 mb-8 text-muted-foreground">
        Have a project in mind? Want to discuss a collaboration? Send me a message.
      </p>
      <ContactForm />
    </div>
  )
}
