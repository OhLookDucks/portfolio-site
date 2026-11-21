import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "John Mark Ong – Support Operations & Automation" },
      {
        name: "description",
        content:
          "Customer support professional building automations for support teams.",
      },
    ],
  }),
  component: Home,
})

function Home() {
  return (
    <>
      {/* Hero: dark console background, direction C picked by the owner (2026-11-21) */}
      <section className="bg-[#1d2b31] text-[#e8eef0]">
        <div className="mx-auto grid max-w-5xl items-center gap-12 px-6 py-20 md:grid-cols-[1.15fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Open to support operations and automation roles
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.06] tracking-tight sm:text-5xl">
              Hi, I&rsquo;m John Mark. I help customers get unstuck, and I
              automate the busywork.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              Four years in customer support across telecom and SaaS, and a
              habit of fixing repeated problems at the root. Everything below
              runs on its own, today.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="mailto:ongjohnmarkc@gmail.com?subject=Hello%20John%20Mark"
                className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#1d2b31] shadow-sm transition hover:-translate-y-0.5"
              >
                Email me
              </a>
              <a
                href="/JohnMark_Ong_CV.pdf"
                download
                className="rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Download CV
              </a>
            </div>
            <p className="mt-8 font-mono text-xs text-white/40">
              $ digest at 08:00 Asia/Manila · 4 automations live · 0 broken
            </p>
          </div>
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-[2.5rem] bg-emerald-400/10 blur-2xl"
            />
            <img
              src="/john-mark-ong.jpg"
              alt="Photo of John Mark Ong"
              className="relative aspect-square w-full max-w-[340px] rounded-[2rem] border border-white/10 object-cover shadow-2xl md:ml-auto"
            />
          </div>
        </div>
      </section>

      {/* Short pointer: the evidence lives on the About page */}
      <section className="bg-sand">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <h2 className="text-2xl font-bold">About me</h2>
          <p className="mt-3 max-w-3xl">
            Four years in support across telecom and SaaS, and a habit of
            fixing repeated problems at the root, now pointed at automation.
          </p>
          <Link
            to="/about"
            className="mt-2 inline-block text-muted-foreground underline underline-offset-4"
          >
            The full story, with numbers →
          </Link>
        </div>
      </section>
    </>
  )
}
