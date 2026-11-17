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
          "Small automations I've built or am planning — Downloads auto-sorter, Gmail auto-labeler, and support ticket triage.",
      },
    ],
  }),
  component: Projects,
})

// Projects carried over word-for-word from the old site
const PROJECTS: {
  title: string
  tag?: string
  meta: string
  description: string
  bullets?: string[]
  detail?: boolean
}[] = [
  {
    title: "Downloads auto-sorter",
    detail: true,
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
    tag: "In progress",
    meta: "Gmail · Google Sheets · Apps Script",
    description:
      "Sorting incoming email into groups automatically: my job-application emails flow into a Google Sheet and update themselves via a browser extension and Apps Script. Simple rules first, with AI planned for the messages the rules miss. Already functional, still being finished.",
  },
  {
    title: "Support ticket triage",
    tag: "Planned",
    meta: "No-code automation · AI",
    description:
      "A workflow that reads incoming support messages, tags the topic and urgency, and routes each one to the right queue.",
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
                {project.detail ? (
                  <Link
                    to="/projects/downloads-auto-sorter"
                    className="hover:text-primary"
                  >
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
