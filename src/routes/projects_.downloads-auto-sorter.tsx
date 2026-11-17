import { createFileRoute } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"

// Design decided in ticket #6: variant A's case-study flow with variant C's
// terminal panel. The three original variants are preserved on the branch
// prototype/detail-page-variants.
export const Route = createFileRoute("/projects_/downloads-auto-sorter")({
  head: () => ({
    meta: [
      { title: "Downloads auto-sorter – John Mark Ong" },
      {
        name: "description",
        content:
          "A Python script that sorts my Downloads folder every 30 minutes — by type, with hash-based duplicate detection.",
      },
    ],
  }),
  component: DownloadsAutoSorterPage,
})

const LEARNINGS = [
  "Tracing a Windows Task Scheduler error code led me straight to a missing program path — error messages are clues, not walls.",
  "Comparing file contents (SHA-256 hashes) beats guessing by filename: two different files can share a name, and two identical files rarely do.",
  "Guardrails make automation trustworthy: a 24-hour freshness rule and a keep-list stop the sorter from grabbing folders still in use.",
]

function TerminalTree() {
  return (
    <div className="rounded-lg bg-zinc-900 p-5 font-mono text-sm text-zinc-100">
      <p className="text-zinc-400">$ tree Documents/automation</p>
      <p>Documents/automation/</p>
      <p>├── sort_downloads.py <span className="text-zinc-400"># 119 lines, stdlib only</span></p>
      <p>└── sort_log.txt <span className="text-zinc-400"># one line per move</span></p>
      <p className="mt-3 text-zinc-400">$ Downloads/ after two weeks</p>
      <p>Archives/ Documents/ Images/ Music/ Torrents/ Videos/ …</p>
      <p className="text-emerald-400"># every 30 min · 11 categories · nothing overwritten</p>
    </div>
  )
}

function DownloadsAutoSorterPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-extrabold">Downloads auto-sorter</h1>
      <p className="mt-2 text-muted-foreground">
        Python · Windows Task Scheduler · running every 30 minutes
      </p>

      <h2 className="mt-8 text-xl font-bold">The problem</h2>
      <p className="mt-2">
        My Downloads folder was a landfill: installers, documents, game
        repacks and screenshots all in one pile, with duplicate files
        multiplying every time I re-downloaded something.
      </p>

      <h2 className="mt-8 text-xl font-bold">How it works</h2>
      <p className="mt-2">
        Every 30 minutes, a scheduled task wakes the script up. It then:
      </p>
      <ol className="mt-2 list-decimal space-y-2 pl-5">
        <li>Sorts loose files into one of 11 folders, by file type.</li>
        <li>
          Checks duplicates by comparing file contents (SHA-256), not names —
          true duplicates go to a <span className="font-mono">Duplicates/</span>{" "}
          folder, different files are kept side by side.
        </li>
        <li>
          Routes loose folders too: a name with repack or install in it goes
          to <span className="font-mono">Installers/</span>, otherwise the most
          common file type inside decides.
        </li>
        <li>
          Leaves folders touched in the last 24 hours alone — they may still
          be in use.
        </li>
      </ol>
      <p className="mt-3">
        A preview mode shows what would move before anything moves, and every
        run is logged.
      </p>

      <h2 className="mt-8 text-xl font-bold">The structure</h2>
      <div className="mt-3">
        <TerminalTree />
      </div>

      <h2 className="mt-8 text-xl font-bold">What I learned</h2>
      <ul className="mt-2 list-disc space-y-2 pl-5">
        {LEARNINGS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="mt-8">
        <Button
          render={
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=ongjohnmarkc@gmail.com&su=Tell%20me%20about%20your%20auto-sorter"
              target="_blank"
              rel="noreferrer"
            />
          }
          nativeButton={false}
        >
          Ask me about it
        </Button>
      </div>
    </article>
  )
}
