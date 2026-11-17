import { createFileRoute } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About – John Mark Ong" },
      {
        name: "description",
        content:
          "Four years in customer support across telecom and SaaS, now building small automations.",
      },
    ],
  }),
  component: About,
})

function About() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-14">
      <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
        Open to support operations and automation roles
      </span>
      <h1 className="mt-4 text-3xl font-extrabold">About me</h1>
      {/* Wording carried over from the old site */}
      <p className="mt-4 max-w-3xl">
        I&rsquo;ve spent over four years helping people with billing questions,
        device setups, and reservations, on the phone, in chat, and by email.
        I&rsquo;m careful with details, calm when things change fast, and I
        like finding ways to make a repeated task easier.
      </p>
      <p className="mt-3 max-w-3xl text-muted-foreground">
        Based in Cebu, Philippines. Comfortable working across time zones,
        with a dedicated home office and reliable fiber internet.
      </p>
      <p className="mt-4 max-w-3xl">
        These days I&rsquo;m learning automation by building it — this very
        portfolio is being rebuilt hands-on together with an AI coding agent.
      </p>
      <div className="mt-6">
        <Button
          render={
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=ongjohnmarkc@gmail.com&su=Hello%20John%20Mark"
              target="_blank"
              rel="noreferrer"
            />
          }
          nativeButton={false}
        >
          Email me
        </Button>
      </div>
    </section>
  )
}
