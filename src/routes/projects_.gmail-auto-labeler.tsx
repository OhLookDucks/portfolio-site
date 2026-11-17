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
          "Job-application emails flow into a Google Sheet and update themselves via a browser extension and Apps Script.",
      },
    ],
  }),
  component: GmailAutoLabelerPage,
})

function GmailAutoLabelerPage() {
  return (
    <CaseStudy
      title="Gmail auto-labeler"
      meta="Gmail · Google Sheets · Apps Script · in progress"
      problem="Every application I send triggers mail I have to keep track of — the company, the role, the status, the follow-up date. Copying all of that into a tracker by hand lasted about a week before I automated it."
      howIntro="The pipeline runs on mail I already receive — no new inbox rules to maintain by hand:"
      steps={[
        "`Gmail filters` catch the incoming mail: application confirmations, replies, assessment invites.",
        "A `browser extension` passes the details along to the script side.",
        "`Apps Script` writes the row into the tracker sheet automatically — date, company, role, platform, posting link, status.",
        "The sheet also tracks `Status` and `Follow-Up Date`, so I can see at a glance what needs chasing.",
      ]}
      afterSteps="Simple rules run the pipeline today; AI is planned for the messages the rules miss. It is already functional and still being finished."
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
            lines: [{ text: "Gmail filters → extension → Apps Script → Sheet" }],
          },
        ],
        footer: "# auto-updated · no manual copying · rules first, AI next",
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
