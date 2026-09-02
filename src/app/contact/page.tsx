import { ContactForm } from './ContactForm'
export const metadata = { title: 'Contact' }
export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Contact</h1>
      <p className="mt-4 text-muted-foreground">Have a question or want to work together? Send me a message.</p>
      <ContactForm />
    </div>
  )
}
