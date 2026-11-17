import { createFileRoute } from "@tanstack/react-router"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills and tools – John Mark Ong" },
      {
        name: "description",
        content:
          "Support platforms, workspace tools, automation and AI, plus what I'm learning building this portfolio.",
      },
    ],
  }),
  component: Skills,
})

// Skill groups carried over from the old site, plus the hands-on learning group:
// "Building this portfolio" lists only tools actually used in this rebuild.
const SKILL_GROUPS: { name: string; items: string }[] = [
  { name: "Support platforms", items: "Freshworks, Amazon Connect, Slack" },
  {
    name: "Workspace",
    items: "Google Workspace, Microsoft 365, Zoom, Google Meet, Microsoft Teams",
  },
  {
    name: "Automation and AI",
    items: "Python (learning), Windows Task Scheduler, AI coding agents (pairing with Claude), ChatGPT, Claude, Gemini, Atlassian Rovo",
  },
  {
    name: "Support work",
    items: "Inbound and outbound calls, email management, live chat, technical troubleshooting, COI compliance, content moderation",
  },
  {
    name: "Learning by building this portfolio",
    items: "AI coding agents (Claude), TanStack Start, React, Tailwind CSS, Netlify, Git and GitHub, VS Code with WSL",
  },
]

function Skills() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="text-3xl font-extrabold">Skills and tools</h1>
      <p className="mt-2 text-muted-foreground">
        What I use day to day in support work, and what I&rsquo;m learning for
        automation, including building this very site hands-on with an AI
        coding agent.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {SKILL_GROUPS.map((group) => (
          <Card key={group.name}>
            <CardHeader>
              <CardTitle>{group.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{group.items}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
