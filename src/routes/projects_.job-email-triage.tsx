import { createFileRoute } from "@tanstack/react-router"
import { CaseStudy } from "@/components/case-study"

// Shipped 2026-11-19: the live n8n workflow "Job Email Triage".
// Structure only: no real company names or application rows are published.
export const Route = createFileRoute("/projects_/job-email-triage")({
  head: () => ({
    meta: [
      { title: "Job email triage agent – John Mark Ong" },
      {
        name: "description",
        content:
          "An AI agent in n8n classifies every incoming job email the moment it arrives: signal, company, role and next action land in a triage board, and non-job mail never reaches it. Hardened after a real outage with retries, rate-limited alerting and a keyword pre-filter.",
      },
    ],
  }),
  component: JobEmailTriagePage,
})

function JobEmailTriagePage() {
  return (
    <CaseStudy
      title="Job email triage agent"
      meta="Gmail · n8n · Gemini · Google Sheets · live, runs around the clock"
      problem="A job search means a steady stream of mail: confirmations, rejections, interview invites, assessment links, requirement requests. Reading and sorting all of it eats the time you should spend applying, and one missed interview email can cost an opportunity."
      howIntro="An AI triage layer now watches the inbox and files every job email as it arrives:"
      steps={[
        "A `Gmail trigger` in `n8n` hands each new email to the pipeline the moment it lands.",
        "`Gemini` reads it and answers in strict `JSON`: the signal, the company, the role, the next action, and one plain sentence of why.",
        "A `filter` drops anything that is not about a job application, so newsletters and noise never reach the log.",
        "Job-related mail lands in a `Google Sheets` triage board with its verdict and reasoning, ready for the morning review.",
      ]}
      afterSteps="Underneath it, the deterministic Gmail auto-labeler still runs the tracker; this agent is the AI layer for what rules alone can't judge. Rules first, AI where rules fall short, both live at once. And the morning review is a glance at one board instead of an inbox dig."
      terminal={{
        blocks: [
          {
            prompt: "$ the verdict, for every email",
            lines: [
              { text: '{ "signal": "interview", "company": "...", "role": "...",' },
              { text: '  "next_action": "prepare for interview",' },
              { text: '  "why": "invites me to pick a time this week" }' },
            ],
          },
          {
            prompt: "$ the pipeline",
            lines: [
              { text: "Gmail trigger → keyword gate → Gemini → filter → triage board" },
              { text: "not job-related? → stops there, log stays clean" },
              { text: "any failure → one alert per workflow, per hour" },
            ],
          },
        ],
        footer: "# classified · filtered · logged · 24/7",
      }}
      extraSections={[
        {
          title: "When it broke",
          body: "A week in, my own safety net caught a real failure and then taught me a bigger one. Gemini's free quota ran out, every failed run left its emails unprocessed, and the Gmail trigger re-fetched the same mail every minute. My error alerting did exactly what I designed it to do: it emailed me on every failure, once per minute. The alerting worked. The design was wrong.",
          items: [
            "`Retry On Fail` on the LLM node: most quota errors are momentary, so three spaced-out retries now rescue runs that used to die instantly.",
            "Rate-limited alerting: a small `Code` node keeps one timestamp per workflow in n8n's workflow memory and allows at most one failure email per workflow per hour. My first version had no limiter and flooded me during exactly the outage it was built for.",
            "A keyword gate before the AI: an `IF` node checks the subject and sender against a short allowlist, so newsletters and notifications never reach `Gemini`. Cheap gate first, expensive judge second.",
            "Ops hygiene: Google's test-mode sign-ins expire weekly, so the OAuth app now runs in production mode and the weekly credential breakage is gone.",
          ],
          closing: "The pipeline is the same shape as day one. What changed is everything around it: retries, quiet alerts, and a gate that protects the quota. Building the system taught me the pipeline; operating it taught me the rest.",
        },
      ]}
      gallery={[
        {
          src: "/images/triage-canvas.webp",
          alt: "The n8n workflow canvas: a Gmail trigger feeds each new email to a Gemini LLM chain, a filter node keeps only job-related mail, and a Google Sheets node appends the rest to a log",
          caption: "The pipeline in n8n: every new email goes from the Gmail trigger through Gemini to the filter and the sheet.",
          width: 1400,
          height: 655,
        },
        {
          src: "/images/triage-executions.webp",
          alt: "The n8n executions list showing nine successful automatic runs; one run's output shows a GitHub notification email correctly stopped at the false branch of the filter",
          caption: "It runs by itself: every automatic execution is logged, and in the open one a non-job email was stopped by the filter.",
          width: 1400,
          height: 655,
        },
        {
          src: "/images/triage-board.webp",
          alt: "The triage board in Google Sheets: one row per email with timestamp, subject, sender, signal, company, role, next action, and the reasoning in the Why column",
          caption: "The triage board: one row per email, with the reasoning in plain words in the Why column.",
          width: 1400,
          height: 175,
        },
      ]}
      learnings={[
        "Asking the AI for strict JSON plus a one-line why makes every verdict auditable: a triage log you can trust beats a magic black box.",
        "The filter after the AI matters as much as the AI. Most mail is not job mail, and the board stays clean because of it.",
        "Node-by-node testing in n8n, executing one step and inspecting its output, turned debugging into checking doors one by one instead of guessing.",
        "Alerts are a product too. An alert that fires sixty times an hour trains you to ignore it, so rate limiting is part of alerting, not a nice-to-have.",
      ]}
      learningsTitle="What I learned"
      emailSubject="Tell me about your job email triage agent"
    />
  )
}
