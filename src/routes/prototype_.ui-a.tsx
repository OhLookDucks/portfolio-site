import { createFileRoute, Link } from "@tanstack/react-router"

// Prototype A: "Quiet Confidence". A refinement of the current warm design:
// bigger hero type, softer shadows, hover lift on cards, more whitespace.
// Palette and photo unchanged (guardrail 5).

export const Route = createFileRoute("/prototype_/ui-a")({
  head: () => ({
    meta: [{ title: "Prototype A: Quiet Confidence – John Mark Ong" }],
  }),
  component: PrototypeA,
})

function Switcher() {
  return (
    <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full bg-foreground/90 p-1.5 text-xs font-semibold text-background shadow-lg">
      <span className="rounded-full bg-background px-3 py-1.5 text-foreground">A · Quiet</span>
      <Link to="/prototype/ui-b" className="px-3 py-1.5 opacity-70 transition hover:opacity-100">
        B · Editorial
      </Link>
      <Link to="/prototype/ui-c" className="px-3 py-1.5 opacity-70 transition hover:opacity-100">
        C · Console
      </Link>
      <Link to="/" className="px-3 py-1.5 opacity-70 transition hover:opacity-100">
        Live site
      </Link>
    </div>
  )
}

const PROJECTS = [
  {
    title: "Job email triage",
    meta: "n8n · Gemini · Gmail · Sheets",
    description:
      "An AI agent classifies every incoming job email and files signal, company and next action on a triage board.",
  },
  {
    title: "Gmail auto-labeler",
    meta: "Apps Script · Google Sheets",
    description:
      "Application mail labels itself by content and statuses move themselves, never backwards.",
  },
  {
    title: "Downloads auto-sorter",
    meta: "Python · Task Scheduler",
    description:
      "A script that keeps the Downloads folder sorted, with hash-based duplicate detection.",
  },
]

function PrototypeA() {
  return (
    <div className="bg-background">
      <Switcher />

      {/* Hero */}
      <section className="mx-auto grid max-w-5xl items-center gap-16 px-6 pb-24 pt-16 md:grid-cols-[1.15fr_1fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Open to support operations and automation roles
          </span>
          <h1 className="mt-6 text-5xl font-extrabold leading-[1.04] tracking-tight sm:text-6xl">
            I help customers get unstuck.
            <span className="mt-2 block text-primary">Now I automate the busywork.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Four years in customer support across telecom and SaaS, and a habit
            of fixing repeated problems at the root. Everything below runs on
            its own, today.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="mailto:ongjohnmarkc@gmail.com"
              className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Email me
            </a>
            <a
              href="/JohnMark_Ong_CV.pdf"
              className="rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-sm"
            >
              Download CV
            </a>
          </div>
        </div>
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-5 rounded-[3rem] bg-peach/70 blur-2xl"
          />
          <img
            src="/john-mark-ong.jpg"
            alt="Photo of John Mark Ong"
            className="relative aspect-square w-full max-w-[340px] rounded-[2rem] border-4 border-card object-cover shadow-[0_24px_60px_rgba(36,50,56,0.18)] md:ml-auto"
          />
        </div>
      </section>

      {/* Proof strip */}
      <section className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-3 gap-4 rounded-2xl bg-sand p-8 text-center">
          {[
            ["27", "applications tracked"],
            ["3", "interviews landed"],
            ["4", "automations live"],
          ].map(([n, label]) => (
            <div key={label}>
              <p className="text-4xl font-extrabold tracking-tight text-primary">{n}</p>
              <p className="mt-1 text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Selected work, all live
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {PROJECTS.map((p) => (
            <Link
              key={p.title}
              to="/projects"
              className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(36,50,56,0.12)]"
            >
              <p className="text-xs font-medium text-muted-foreground">{p.meta}</p>
              <h3 className="mt-2 text-lg font-bold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>
              <p className="mt-4 text-sm font-semibold text-primary transition group-hover:translate-x-1">
                Read the story →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-8 text-sm text-muted-foreground">
          <p>John Mark Ong · Cebu, Philippines</p>
          <a href="mailto:ongjohnmarkc@gmail.com" className="font-medium text-foreground hover:text-primary">
            ongjohnmarkc@gmail.com
          </a>
        </div>
      </footer>
    </div>
  )
}
