import { createFileRoute, Link } from "@tanstack/react-router"

// Prototype C: "Ops Console". Leans into the automation identity: a dark
// hero styled like the terminal blocks from the case studies, metric chips
// from the funnel dashboard, and projects shown as a live queue. Warm sand
// section below keeps the human feel (guardrail 5).

export const Route = createFileRoute("/prototype_/ui-c")({
  head: () => ({
    meta: [{ title: "Prototype C: Ops Console – John Mark Ong" }],
  }),
  component: PrototypeC,
})

function Switcher() {
  return (
    <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full bg-foreground/90 p-1.5 text-xs font-semibold text-background shadow-lg">
      <Link to="/prototype/ui-a" className="px-3 py-1.5 opacity-70 transition hover:opacity-100">
        A · Quiet
      </Link>
      <Link to="/prototype/ui-b" className="px-3 py-1.5 opacity-70 transition hover:opacity-100">
        B · Editorial
      </Link>
      <span className="rounded-full bg-background px-3 py-1.5 text-foreground">C · Console</span>
      <Link to="/" className="px-3 py-1.5 opacity-70 transition hover:opacity-100">
        Live site
      </Link>
    </div>
  )
}

const QUEUE = [
  {
    status: "LIVE · 24/7",
    tone: "bg-emerald-400/15 text-emerald-300",
    title: "Job email triage",
    log: "gemini classifies every email, filter drops the noise",
  },
  {
    status: "LIVE · 8 AM",
    tone: "bg-emerald-400/15 text-emerald-300",
    title: "Daily digest",
    log: "one morning email: counts, signals, next actions",
  },
  {
    status: "LIVE · 30 MIN",
    tone: "bg-emerald-400/15 text-emerald-300",
    title: "Gmail auto-labeler",
    log: "statuses move themselves, never backwards",
  },
  {
    status: "SHIPPED",
    tone: "bg-sky-400/15 text-sky-300",
    title: "Downloads auto-sorter",
    log: "sorts by type, catches duplicates by content",
  },
]

function PrototypeC() {
  return (
    <div className="bg-background">
      <Switcher />

      {/* Console hero */}
      <section className="bg-[#1d2b31] text-[#e8eef0]">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-6 font-mono text-sm leading-relaxed shadow-2xl">
            <div aria-hidden="true" className="flex gap-1.5 pb-5">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <p>
              <span className="text-emerald-400">$</span> whoami
            </p>
            <p className="text-white/80">
              John Mark Ong · customer support, 4 years, telecom + SaaS · Cebu, PH
            </p>
            <p className="mt-4">
              <span className="text-emerald-400">$</span> cat current-mission.txt
            </p>
            <p className="text-white/80">
              Make the same ticket stop arriving. Support operations and
              automation roles welcome.
            </p>
            <p className="mt-4">
              <span className="text-emerald-400">$</span> ./automations --status
            </p>
            <p className="text-emerald-300">4 live · 0 broken · digest at 08:00 Asia/Manila</p>
            <p className="mt-4 animate-pulse text-white/50">▌</p>
          </div>

          {/* Metric chips, straight from the funnel dashboard */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["27", "applications"],
              ["3", "interviews"],
              ["4", "automations live"],
              ["0", "missed digests"],
            ].map(([n, label]) => (
              <div key={label} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-2xl font-bold text-white">{n}</p>
                <p className="text-xs text-white/60">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Queue */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          The queue · every row runs itself
        </p>
        <div className="mt-6 overflow-hidden rounded-2xl border border-border">
          {QUEUE.map((row) => (
            <div
              key={row.title}
              className="grid grid-cols-[auto_1fr] items-center gap-4 border-b border-border bg-card px-5 py-4 transition hover:bg-sand/70 sm:grid-cols-[auto_1fr_auto]"
            >
              <span className={`rounded-full px-3 py-1 font-mono text-[11px] font-semibold ${row.tone}`}>
                {row.status}
              </span>
              <span>
                <span className="block font-semibold">{row.title}</span>
                <span className="block font-mono text-xs text-muted-foreground">{row.log}</span>
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 font-mono text-xs text-muted-foreground">
          // full stories on the projects page
        </p>
      </section>

      {/* Warm close */}
      <section className="bg-sand">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 py-16 md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-2xl font-bold tracking-tight">
              Behind the console: four years on the phone, in chat and by
              email, for real customers.
            </p>
            <p className="mt-3 max-w-xl text-muted-foreground">
              The automations exist because I did the manual version first.
              That is the actual job: know the work, then remove the repetition.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="mailto:ongjohnmarkc@gmail.com"
                className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5"
              >
                Email me
              </a>
              <a
                href="/JohnMark_Ong_CV.pdf"
                className="rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5"
              >
                Download CV
              </a>
            </div>
          </div>
          <img
            src="/john-mark-ong.jpg"
            alt="Photo of John Mark Ong"
            className="aspect-square w-full max-w-[260px] rounded-[2rem] border-4 border-card object-cover shadow-[0_24px_60px_rgba(36,50,56,0.16)]"
          />
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-8 font-mono text-xs text-muted-foreground">
          <p>John Mark Ong · Cebu, Philippines</p>
          <a href="mailto:ongjohnmarkc@gmail.com" className="text-foreground hover:text-primary">
            ongjohnmarkc@gmail.com
          </a>
        </div>
      </footer>
    </div>
  )
}
