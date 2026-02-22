import type { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contact — Get in Touch About a Project or Collaboration",
  description:
    "Have a project in mind or want to discuss a collaboration? Reach out about software development, AI integration, localization, or consulting work.",
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 md:py-24">
      <h1 className="text-balance font-heading font-semibold text-3xl">Get in Touch</h1>
      <p className="mt-2 mb-8 text-muted-foreground">
        Have a project in mind? Want to discuss a collaboration? Send me a message.
      </p>
      <ContactForm />
    </div>
  )
}
