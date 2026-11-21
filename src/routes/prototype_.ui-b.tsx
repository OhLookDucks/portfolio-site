import { createFileRoute, Link } from "@tanstack/react-router"

// Prototype B: "Warm Editorial". Bolder display type, color-blocked hero with
// an arched photo, numbered sections, projects as big index rows. Same warm
// palette and photo (guardrail 5).

export const Route = createFileRoute("/prototype_/ui-b")({
  head: () => ({
    meta: [{ title: "Prototype B: Warm Editorial – John Mark Ong" }],
  }),
  component: PrototypeB,
})

function Switcher() {
  return (
    <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full bg-foreground/90 p-1.5 text-xs font-semibold text-background shadow-lg">
      <Link to="/prototype/ui-a" className="px-3 py-1.5 opacity-70 transition hover:opacity-100">
        A · Quiet
      </Link>
      <span className="rounded-full bg-background px-3 py-1.5 text-foreground">B · Editorial</span>
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
    index: "01",
    title: "Job email triage",
    meta: "n8n · Gemini · Gmail · Sheets",
    note: "AI classifies every application email, around the clock",
  },
  {
    index: "02",
    title: "Gmail auto-labeler",
    meta: "Apps Script · Google Sheets",
    note: "Mail labels itself and statuses move themselves, never backwards",
  },
  {
    index: "03",
    title: "Downloads auto-sorter",
    meta: "Python · Task Scheduler",
    note: "A folder that stays tidy, with hash-based duplicate detection",
  },
]

function PrototypeB() {
  return (
    <div className="bg-background">
      <Switcher />

      {/* Hero, color-blocked */}
      <section className="bg-sand">
        <div className="mx-auto grid max-w-6xl items-end gap-12 px-6 pb-20 pt-20 md:grid-cols-[1.25fr_1fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#7a3e12]">
              01 · Hello
            </p>
            <h1 className="mt-8 text-6xl font-extrabold leading-[0.95] tracking-tighter md:text-7xl">
              Support pro
              <br />
              by trade.
              <span className="block text-primary">Automator by obsession.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Four years in customer support across telecom and SaaS. Now I
              build small automations that give hours back, and this site is
              the proof, not the promise.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="mailto:ongjohnmarkc@gmail.com"
                className="rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition hover:-translate-y-0.5"
              >
                Email me
              </a>
              <a
                href="/JohnMark_Ong_CV.pdf"
                className="rounded-full border-2 border-foreground/20 px-7 py-3.5 text-sm font-semibold transition hover:border-foreground"
              >
                Download CV
              </a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[340px]">
            <div aria-hidden="true" className="absolute -left-6 top-10 h-full w-full rounded-t-[10rem] bg-peach" />
            <img
              src="/john-mark-ong.jpg"
              alt="Photo of John Mark Ong"
              className="relative aspect-[4/5] w-full rounded-t-[10rem] border-4 border-card object-cover shadow-[0_24px_60px_rgba(36,50,56,0.16)]"
            />
          </div>
        </div>
      </section>

      {/* Statement band */}
      <section className="bg-peach">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
            Every project on this site is a repeated task I made disappear.
          </p>
        </div>
      </section>

      {/* Projects as index rows */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#7a3e12]">
          02 · The work, all live
        </p>
        <div className="mt-8">
          {PROJECTS.map((p) => (
            <Link
              key={p.title}
              to="/projects"
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 border-t border-border py-8 transition hover:bg-sand/60"
            >
              <span className="text-5xl font-extrabold tracking-tighter text-[#e9dfd2] transition group-hover:text-peach">
                {p.index}
              </span>
              <span>
                <span className="block text-2xl font-bold tracking-tight">{p.title}</span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  {p.meta} · {p.note}
                </span>
              </span>
              <span className="text-2xl text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Numbers */}
      <section className="bg-sand">
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-6 px-6 py-16 text-center">
          {[
            ["27", "applications tracked"],
            ["3", "interviews landed"],
            ["4", "automations live"],
          ].map(([n, label]) => (
            <div key={label}>
              <p className="text-5xl font-extrabold tracking-tighter text-[#0b5c56]">{n}</p>
              <p className="mt-2 text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-10 text-sm text-muted-foreground">
          <p className="font-mono text-xs uppercase tracking-[0.3em]">03 · Say hello</p>
          <a href="mailto:ongjohnmarkc@gmail.com" className="font-medium text-foreground hover:text-primary">
            ongjohnmarkc@gmail.com
          </a>
        </div>
      </footer>
    </div>
  )
}
