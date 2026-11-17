import { createFileRoute } from "@tanstack/react-router"
import { CaseStudy } from "@/components/case-study"

// Content captured from the owner's live tracker Sheet (wayfinder ticket #5):
// structure only — no personal job-application rows are published.
export const Route = createFileRoute("/projects_/gmail-auto-labeler")({
  head: () => ({
    meta: [
      { title: "Gmail auto-labeler – John Mark Ong" },
      {
        name: "description",
        content:
          "Job-application emails are labeled by content and flow into a Google Sheet that updates itself — rejections and interview invites move statuses automatically. Runs every 10 minutes.",
      },
    ],
  }),
  component: GmailAutoLabelerPage,
})

function GmailAutoLabelerPage() {
  return (
    <CaseStudy
      title="Gmail auto-labeler"
      meta="Gmail · Google Sheets · Apps Script · runs every 10 minutes"
      problem="Every application I send triggers mail I have to keep track of — the company, the role, the status, the follow-up date. Copying all of that into a tracker by hand lasted about a week before I automated it."
      howIntro="The pipeline runs on mail I already receive — no new inbox rules to maintain by hand:"
      steps={[
        "`Gmail filters` catch the incoming mail: application confirmations, replies, assessment invites.",
        "A `browser extension` passes the details along to the script side.",
        "`Apps Script` writes the row into the tracker sheet automatically — date, company, role, platform, posting link, status.",
        "Every 10 minutes, a content scanner labels new mail into `Jobs/Rejected`, `Jobs/Interview`, `Jobs/Assessment` and `Jobs/Offer` — by the phrases in the email, not by hand.",
        "Statuses move themselves: a rejection flips the row to `Rejected` with an `Auto: Rejected (date)` note, an invite moves it to `Interviewing` — and a status never moves backwards.",
      ]}
      afterSteps="Simple rules run the pipeline; AI is next for the messages the rules miss."
      terminal={{
        blocks: [
          {
            prompt: "$ job-tracker — the Sheet's columns",
            lines: [
              { text: "Date Applied   Company/Client   Role Title" },
              { text: "Platform       Job Posting Link" },
              { text: "Status         Follow-Up Date   Notes/Feedback" },
            ],
          },
          {
            prompt: "$ the pipeline",
            lines: [
              { text: "Gmail filters → extension → Apps Script → Sheet" },
              { text: "content scan → Jobs/<status> label → status update" },
            ],
          },
        ],
        footer: "# auto-updated · labels by content · every 10 min",
      }}
      learnings={[
        "Deciding the columns first turned the spreadsheet into a schema — automation gets easy when the data has a fixed shape.",
        "Deterministic rules should run the show; AI belongs to the messages the rules can't catch, not to the whole pipeline.",
        "Small glue — a browser extension plus Apps Script — can remove real weekly busywork without needing a backend.",
      ]}
      learningsTitle="What I learned so far"
      emailSubject="Tell me about your Gmail auto-labeler"
    />
  )
}
