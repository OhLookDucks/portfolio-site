import { createFileRoute } from "@tanstack/react-router"
import { Link } from "@tanstack/react-router"
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
  bullets?: string[]
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
    bullets: [
      "Has a preview mode, so I can see what would move before anything moves.",
      "Skips half-finished downloads and never overwrites a file with a different version.",
      "Fixed a scheduling bug by tracing the task's error code to a missing program path.",
    ],
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
    <section className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="text-3xl font-extrabold">Projects</h1>
      <p className="mt-2 text-muted-foreground">
        Small automations I have built or am planning, mostly to show how I
        would make a support team&rsquo;s day easier.
      </p>
      <div className="mt-8 flex flex-col gap-4">
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
              {project.bullets ? (
                <ul className="mt-3 list-disc space-y-1 pl-5 text-muted-foreground">
                  {project.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
