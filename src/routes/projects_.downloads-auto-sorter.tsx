import { createFileRoute } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { PrototypeSwitcher } from "@/components/prototype-switcher"

// PROTOTYPE: three variants of the project detail page, switchable via
// ?variant= (floating bottom bar). Throwaway — the winning design gets
// folded into the real page and the losers removed (ticket #6).
// Real content only, recovered from the owner's PC (ticket #4).

export const Route = createFileRoute("/projects_/downloads-auto-sorter")({
  validateSearch: (search: Record<string, unknown>) => ({
    variant: (search.variant as string) || "A",
  }),
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
  component: ProjectPage,
})

const VARIANTS = [
  { key: "A", name: "Case study column" },
  { key: "B", name: "Spec sheet + story" },
  { key: "C", name: "Terminal style" },
]

const FACTS = [
  ["Status", "Running every 30 minutes since November 2026"],
  ["Built with", "Python, standard library only (no packages)"],
  ["Size", "119 lines of code"],
  ["Runs on", "Windows Task Scheduler"],
  ["Extras", "Preview mode, cleanup mode, its own log file"],
]

const TREE = [
  { depth: 0, text: "Documents/", note: "" },
  { depth: 1, text: "automation/", note: "the whole project lives here" },
  {
    depth: 2,
    text: "sort_downloads.py",
    note: "the sorter itself — 119 lines, standard library only",
  },
  {
    depth: 2,
    text: "sort_log.txt",
    note: "one line per move: the script's diary",
  },
]

const LEARNINGS = [
  "Tracing a Windows Task Scheduler error code led me straight to a missing program path — error messages are clues, not walls.",
  "Comparing file contents (SHA-256 hashes) beats guessing by filename: two different files can share a name, and two identical files rarely do.",
  "Guardrails make automation trustworthy: a 24-hour freshness rule and a keep-list stop the sorter from grabbing folders still in use.",
]

function StructureTree() {
  return (
    <div className="rounded-lg border border-border bg-card p-4 font-mono text-sm">
      {TREE.map((line) => (
        <div key={line.text} style={{ paddingLeft: line.depth * 24 }}>
          <span>{line.depth > 0 ? "└── " : ""}{line.text}</span>
          {line.note ? (
            <span className="text-muted-foreground"> — {line.note}</span>
          ) : null}
        </div>
      ))}
    </div>
  )
}

function EmailButton() {
  return (
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
  )
}

/* Variant A: classic case-study column — headings carry the story */
function VariantA() {
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
      <h2 className="mt-8 text-xl font-bold">How I built it</h2>
      <p className="mt-2">
        A Python script that wakes up every 30 minutes and sorts loose files
        into 11 folders by type. When a filename already exists, it compares
        the actual contents (SHA-256) — identical files go to a
        <span className="font-mono"> Duplicates/ </span>folder instead of
        overwriting. It also sorts loose folders now: game repacks and
        extracted installs find their way to <span className="font-mono">Installers/</span> on
        their own. A preview mode shows what would move before anything
        moves.
      </p>
      <h2 className="mt-8 text-xl font-bold">The structure</h2>
      <div className="mt-3">
        <StructureTree />
      </div>
      <h2 className="mt-8 text-xl font-bold">What I learned</h2>
      <ul className="mt-2 list-disc space-y-2 pl-5">
        {LEARNINGS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="mt-8">
        <EmailButton />
      </div>
    </article>
  )
}

/* Variant B: facts-first — sticky spec sheet beside the story */
function VariantB() {
  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-4 py-14 md:grid-cols-[260px_1fr]">
      <aside className="md:sticky md:top-6 md:self-start">
        <h1 className="text-2xl font-extrabold md:hidden">Downloads auto-sorter</h1>
        <div className="mt-4 rounded-lg border border-border bg-card p-4 md:mt-0">
          <h2 className="hidden text-xl font-bold md:block">Downloads auto-sorter</h2>
          <dl className="mt-3 space-y-3 text-sm">
            {FACTS.map(([label, value]) => (
              <div key={label}>
                <dt className="font-semibold text-muted-foreground">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-4">
          <EmailButton />
        </div>
      </aside>
      <article>
        <h2 className="text-xl font-bold">Why it exists</h2>
        <p className="mt-2">
          Downloads was a landfill: installers, documents, game repacks and
          screenshots in one pile, with duplicates multiplying. I wanted it
          to clean itself.
        </p>
        <h2 className="mt-8 text-xl font-bold">What it does</h2>
        <p className="mt-2">
          Every 30 minutes: loose files sorted into 11 folders by type;
          duplicate check by comparing file contents, not names; loose
          folders routed too — a game repack lands in
          <span className="font-mono"> Installers/</span>; preview mode shows
          what would move before anything moves.
        </p>
        <h2 className="mt-8 text-xl font-bold">The structure</h2>
        <div className="mt-3">
          <StructureTree />
        </div>
        <h2 className="mt-8 text-xl font-bold">What I learned</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          {LEARNINGS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
    </div>
  )
}

/* Variant C: terminal aesthetic — the tree IS the hero */
function VariantC() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-extrabold">Downloads auto-sorter</h1>
      <p className="mt-2 text-muted-foreground">
        A background organiser for the messiest folder on my PC.
      </p>
      <div className="mt-8 rounded-lg bg-zinc-900 p-5 font-mono text-sm text-zinc-100">
        <p className="text-zinc-400">$ tree Documents/automation</p>
        <p>Documents/automation/</p>
        <p>├── sort_downloads.py <span className="text-zinc-400"># 119 lines, stdlib only</span></p>
        <p>└── sort_log.txt <span className="text-zinc-400"># one line per move</span></p>
        <p className="mt-3 text-zinc-400">$ Downloads/ after two weeks</p>
        <p>Archives/ Documents/ Images/ Music/ Torrents/ Videos/ …</p>
        <p className="text-emerald-400"># every 30 min · 11 categories · 0 lost files</p>
      </div>
      <h2 className="mt-8 text-xl font-bold">How it decides</h2>
      <ol className="mt-2 list-decimal space-y-2 pl-5">
        <li>Loose files go to one of 11 folders, by file type.</li>
        <li>Same filename? Compare SHA-256 contents — true duplicates to <span className="font-mono">Duplicates/</span>, different files kept side by side.</li>
        <li>Loose folders: name says repack or install → <span className="font-mono">Installers/</span>; otherwise the most common file type inside decides.</li>
        <li>Folders touched in the last 24 hours are left alone — they may still be in use.</li>
      </ol>
      <h2 className="mt-8 text-xl font-bold">What I learned</h2>
      <ul className="mt-2 list-disc space-y-2 pl-5">
        {LEARNINGS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="mt-8">
        <EmailButton />
      </div>
    </article>
  )
}

function ProjectPage() {
  const { variant } = Route.useSearch()
  return (
    <>
      {variant === "A" && <VariantA />}
      {variant === "B" && <VariantB />}
      {variant === "C" && <VariantC />}
      <PrototypeSwitcher variants={VARIANTS} current={variant} />
    </>
  )
}
