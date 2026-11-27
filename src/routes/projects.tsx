import { createFileRoute, Link } from "@tanstack/react-router"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects – John Mark Ong" },
      {
        name: "description",
        content:
          "Small automations I've built or am planning: Downloads auto-sorter, Gmail auto-labeler, and a job email triage agent.",
      },
    ],
  }),
  component: Projects,
})

// Projects carried over word-for-word from the old site
// The detail routes exist as separate pages (wayfinder ticket #7); the two
// later ones are typed as a union so the Link stays type-safe.
const PROJECTS: {
  title: string
  tag?: string
  meta: string
  description: string
  detailTo?:
    | "/projects/downloads-auto-sorter"
    | "/projects/gmail-auto-labeler"
    | "/projects/job-email-triage"
}[] = [
  {
    title: "Downloads auto-sorter",
    detailTo: "/projects/downloads-auto-sorter",
    meta: "Python · Windows Task Scheduler",
    description:
      "A script that keeps my Downloads folder organized without me touching it. It sorts files into folders by type, compares file contents to catch true duplicates and sets them aside, and runs by itself every 30 minutes.",
  },
  {
    title: "Gmail auto-labeler",
    detailTo: "/projects/gmail-auto-labeler",
    meta: "Gmail · Google Sheets · Apps Script",
    description:
      "Job-application emails are sorted into Gmail labels by content and flow into a Google Sheet that updates itself: statuses move automatically when a rejection or interview invite arrives. Runs every 30 minutes. Rules first, AI next.",
  },
  {
    title: "Job email triage",
    detailTo: "/projects/job-email-triage",
    meta: "n8n · Gemini · Gmail · Google Sheets",
    description:
      "An AI agent that classifies every incoming job email the moment it arrives: signal, company, role and next action land in a triage board, and non-job mail is filtered out before it ever reaches the log. Runs around the clock.",
  },
]

function Projects() {
  return (
    <>
      {/* Dark console band, direction C (2026-11-21) */}
      <section className="bg-[#1d2b31] text-[#e8eef0]">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/50">
            The queue
          </p>
          <h1 className="mt-3 text-3xl font-extrabold">Projects</h1>
          <p className="mt-2 max-w-3xl text-white/70">
            Small automations I have built or am planning, mostly to show how I
            would make a support team&rsquo;s day easier.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col gap-4">
          {PROJECTS.map((project) => (
            <Card key={project.title}>
              <CardHeader>
                <h2 className="flex items-center gap-2 text-lg font-bold">
                  {project.detailTo ? (
                    <Link to={project.detailTo} className="hover:text-primary">
                      {project.title}
                    </Link>
                  ) : (
                    project.title
                  )}
                  {project.tag ? (
                    <span className="rounded-full bg-peach px-2.5 py-0.5 text-xs font-medium text-[#7a3e12]">
                      {project.tag}
                    </span>
                  ) : null}
                </h2>
                <p className="text-sm text-muted-foreground">{project.meta}</p>
              </CardHeader>
              <CardContent>
                <p>{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* The funnel dashboard, embedded. Demo data only (sample rows). */}
      <section className="bg-[#1d2b31] text-[#e8eef0]">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/50">
            Live from the hunt
          </p>
          <h2 className="mt-3 text-2xl font-bold">The application funnel, charted</h2>
          <p className="mt-2 max-w-3xl text-white/70">
            A Looker Studio dashboard over my application tracker. This embed
            runs on sample data; a private copy counts the real hunt.
          </p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <iframe
              src="https://datastudio.google.com/embed/reporting/c0bd2a0f-36db-4ecc-be6f-f31d31b5b01d/page/VC4DG"
              title="Job application funnel dashboard (sample data)"
              loading="lazy"
              className="h-[600px] w-full"
            />
          </div>
        </div>
      </section>
    </>
  )
}
