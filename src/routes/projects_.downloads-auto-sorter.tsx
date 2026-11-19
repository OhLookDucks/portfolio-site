import { createFileRoute } from "@tanstack/react-router"
import { CaseStudy } from "@/components/case-study"

// Content recovered from the owner's PC (wayfinder ticket #4).
export const Route = createFileRoute("/projects_/downloads-auto-sorter")({
  head: () => ({
    meta: [
      { title: "Downloads auto-sorter – John Mark Ong" },
      {
        name: "description",
        content:
          "A Python script that sorts my Downloads folder every 30 minutes, by type, with hash-based duplicate detection.",
      },
    ],
  }),
  component: DownloadsAutoSorterPage,
})

function DownloadsAutoSorterPage() {
  return (
    <CaseStudy
      title="Downloads auto-sorter"
      meta="Python · Windows Task Scheduler · running every 30 minutes"
      problem="My Downloads folder was a landfill: installers, documents and screenshots all in one pile, with duplicate files multiplying every time I re-downloaded something."
      howIntro="Every 30 minutes, a scheduled task wakes the script up. It then:"
      steps={[
        "Sorts loose files into one of 11 folders, by file type.",
        "Checks duplicates by comparing file contents (SHA-256), not names: true duplicates go to a `Duplicates/` folder, different files are kept side by side.",
        "Routes loose folders too: a name with install in it goes to `Installers/`, otherwise the most common file type inside decides.",
        "Leaves folders touched in the last 24 hours alone, since they may still be in use.",
      ]}
      afterSteps="A preview mode shows what would move before anything moves, and every run is logged. The folder just stays tidy now: zero minutes a week spent sorting it."
      terminal={{
        blocks: [
          {
            prompt: "$ tree Documents/automation",
            lines: [
              { text: "Documents/automation/" },
              { text: "├── sort_downloads.py", note: "# 119 lines, stdlib only" },
              { text: "└── sort_log.txt", note: "# one line per move" },
            ],
          },
          {
            prompt: "$ Downloads/ after two weeks",
              lines: [{ text: "Archives/ Documents/ Images/ Music/ Videos/ …" }],
          },
        ],
        footer: "# every 30 min · 11 categories · nothing overwritten",
      }}
      learnings={[
        "Tracing a Windows Task Scheduler error code led me straight to a missing program path: error messages are clues, not walls.",
        "Comparing file contents, not names, is what makes duplicate detection trustworthy: two different files can share a name, and two identical files rarely do.",
        "Guardrails make automation trustworthy: a 24-hour freshness rule and a keep-list stop the sorter from grabbing folders still in use.",
      ]}
      emailSubject="Tell me about your auto-sorter"
    />
  )
}
