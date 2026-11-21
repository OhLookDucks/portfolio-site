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
    <>
      {/* Dark console band, direction C (2026-11-21) */}
      <section className="bg-[#1d2b31] text-[#e8eef0]">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Open to support operations and automation roles
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight">About me</h1>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
      {/* Evidence first: accounts, daily volume, one concrete win (site review 2026-11-20) */}
      <p className="mt-4 max-w-3xl">
        I&rsquo;ve spent four years in customer support across telecom and
        SaaS: two telecommunications accounts and a reservation-based SaaS
        account, on inbound and outbound calls, chat, and email. On a busy
        day that&rsquo;s 40 to 60 contacts, where being careful with details
        and calm when things change fast is the job.
      </p>
      <p className="mt-3 max-w-3xl">
        The example I keep coming back to: customers and admins kept calling
        back about concerns they could solve themselves. So on those calls I
        walked them through the process, showed them how to navigate it, and
        pointed them to the knowledge base articles that cover it. The goal
        was simple: the next time, they wouldn&rsquo;t need to call. That
        instinct is why I moved into automation; every project on this site
        is a repeated task I made easier or made disappear.
      </p>
      <p className="mt-3 max-w-3xl">
        You should also know where I started: zero background in coding or
        automation. Everything on this site is self-taught since I began the
        switch, built step by step in the open with AI coding agents. I&rsquo;m
        not an expert yet; I&rsquo;m the person who ships small working things,
        documents them, and fixes them when they break.
      </p>
      <p className="mt-3 max-w-3xl text-muted-foreground">
        Based in Cebu, Philippines. Comfortable working across time zones,
        with a dedicated home office and reliable fiber internet.
      </p>
      <p className="mt-4 max-w-3xl">
        These days I&rsquo;m learning automation by building it: this very
        portfolio is being rebuilt hands-on together with an AI coding agent.
      </p>
      <div className="mt-6">
        <Button
          render={
            <a href="mailto:ongjohnmarkc@gmail.com?subject=Hello%20John%20Mark" />
          }
          nativeButton={false}
        >
          Email me
        </Button>
      </div>
      </section>
    </>
  )
}
