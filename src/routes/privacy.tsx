import { Link, createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy – John Mark Ong" },
      {
        name: "description",
        content:
          "What this site and my self-hosted automation can and cannot access. Short version: only my own accounts, on my own machine.",
      },
    ],
  }),
  component: Privacy,
})

function Privacy() {
  return (
    <>
      {/* Dark console band, direction C (2026-11-21) */}
      <section className="bg-[#1d2b31] text-[#e8eef0]">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h1 className="text-3xl font-extrabold">Privacy</h1>
          <p className="mt-2 text-white/70">
            The short version: this site has no accounts and no ads, and my
            automation only ever touches my own accounts, on my own machine.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="max-w-3xl space-y-8">
          {/* Google asks for a policy page before any OAuth app can go live,
              even a one-person one. This section is that page. */}
          <div>
            <h2 className="text-xl font-bold">
              The &ldquo;n8n automation&rdquo; Google app
            </h2>
            <p className="mt-2 text-muted-foreground">
              My automation projects (like the email triage you can read about
              under Projects) run on a self-hosted copy of n8n, a workflow
              tool. Google asks for a privacy policy before such an app can
              connect to Gmail or Sheets, even for a one-person setup, so here
              it is:
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>
                It accesses only my own Gmail and my own Google Sheets, through
                Google&rsquo;s official sign-in.
              </li>
              <li>It runs on my own computer, not on a rented server.</li>
              <li>
                Data stays on my machine and in my own Google account. Nothing
                is shared, sold, or visible to anyone else.
              </li>
              <li>
                Only my account can authorize it. If Google ever asks you to
                sign in to &ldquo;n8n automation&rdquo;, stop: it was never
                built for other people.
              </li>
            </ul>
          </div>

          {/* Sand card, same treatment as the contact page */}
          <div className="rounded-lg border border-border bg-sand p-6">
            <h2 className="text-xl font-bold">This website</h2>
            <p className="mt-2 text-muted-foreground">
              No accounts, no logins, no advertising. The contact page is just
              an email link, so anything you send goes straight to my inbox and
              nowhere else.
            </p>
          </div>

          <p className="text-muted-foreground">
            Questions about any of this?{" "}
            <Link
              to="/contact"
              className="font-semibold text-foreground underline underline-offset-4 hover:no-underline"
            >
              Get in touch
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  )
}
