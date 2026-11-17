import { createFileRoute } from "@tanstack/react-router"
import { CaseStudy } from "@/components/case-study"

// This project is PLANNED, the page is honest about that: it describes the
// design and what the owner wants to learn from building it.
export const Route = createFileRoute("/projects_/support-ticket-triage")({
  head: () => ({
    meta: [
      { title: "Support ticket triage – John Mark Ong" },
      {
        name: "description",
        content:
          "A planned no-code workflow that reads incoming support messages, tags topic and urgency, and routes each one to the right queue.",
      },
    ],
  }),
  component: SupportTicketTriagePage,
})

function SupportTicketTriagePage() {
  return (
    <CaseStudy
      title="Support ticket triage"
      meta="No-code automation · AI · planned"
      problem="In support work, every incoming message needs reading, tagging and routing before anyone can actually work on it. I want to design that first mile so it happens in seconds, because the fastest reply is the one that reached the right queue."
      howTitle="The plan"
      howIntro="Four steps, designed no-code first:"
      steps={[
        "`Capture`: incoming support messages land in one place.",
        "`Classify`: tag the topic and the urgency, using simple rules first.",
        "`Route`: send each message to the right queue automatically.",
        "`Review`: humans check the edge cases, and the rules improve from them.",
      ]}
      terminal={{
        blocks: [
          {
            prompt: "$ incoming support message",
            lines: [
              { text: "→ tag:   topic, urgency" },
              { text: "→ route: the right queue" },
              { text: "→ reply: faster, because it reached the right team" },
            ],
          },
        ],
        footer: "# planned · no-code first · AI where rules fall short",
      }}
      learnings={[
        "Whether urgency can be tagged reliably by rules alone, and where AI genuinely earns its place.",
        "How routing rules fail quietly, and how to design the review loop that catches the misses.",
        "How to measure the win: time-to-first-touch per queue, before and after.",
      ]}
      learningsTitle="What I want to learn from it"
      emailSubject="Tell me about your ticket triage plans"
    />
  )
}
