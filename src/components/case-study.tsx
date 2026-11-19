import { Button } from "@/components/ui/button"

// Shared layout for project detail pages (the "A + C" style chosen by the
// owner in ticket #6): case-study headings carry the story, the project's
// structure is shown as a dark terminal panel, learnings close the page.

// Renders `backticked` parts of a string in monospace so plain strings can
// still highlight file and folder names.
function withCode(text: string) {
  const parts = text.split(/`([^`]+)`/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <code key={i} className="font-mono">
        {part}
      </code>
    ) : (
      part
    ),
  )
}

export interface CaseStudyProps {
  title: string
  meta: string
  problem: string
  howTitle?: string
  howIntro?: string
  steps: string[]
  afterSteps?: string
  terminal: {
    blocks: { prompt: string; lines: { text: string; note?: string }[] }[]
    footer?: string
  }
  learnings: string[]
  learningsTitle?: string
  emailSubject: string
}

export function CaseStudy({
  title,
  meta,
  problem,
  howTitle = "How it works",
  howIntro,
  steps,
  afterSteps,
  terminal,
  learnings,
  learningsTitle = "What I learned",
  emailSubject,
}: CaseStudyProps) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-extrabold">{title}</h1>
      <p className="mt-2 text-muted-foreground">{meta}</p>

      <h2 className="mt-8 text-xl font-bold">The problem</h2>
      <p className="mt-2">{withCode(problem)}</p>

      <h2 className="mt-8 text-xl font-bold">{howTitle}</h2>
      {howIntro ? <p className="mt-2">{withCode(howIntro)}</p> : null}
      <ol className="mt-2 list-decimal space-y-2 pl-5">
        {steps.map((step) => (
          <li key={step}>{withCode(step)}</li>
        ))}
      </ol>
      {afterSteps ? <p className="mt-3">{withCode(afterSteps)}</p> : null}

      <h2 className="mt-8 text-xl font-bold">The structure</h2>
      <div className="mt-3 rounded-lg bg-zinc-900 p-5 font-mono text-sm text-zinc-100">
        {terminal.blocks.map((block) => (
          <div key={block.prompt} className={block === terminal.blocks[0] ? "" : "mt-3"}>
            <p className="text-zinc-400">{block.prompt}</p>
            {block.lines.map((line) => (
              <p key={line.text}>
                {line.text}
                {line.note ? <span className="text-zinc-400"> {line.note}</span> : null}
              </p>
            ))}
          </div>
        ))}
        {terminal.footer ? (
          <p className="mt-3 text-emerald-400">{terminal.footer}</p>
        ) : null}
      </div>

      <h2 className="mt-8 text-xl font-bold">{learningsTitle}</h2>
      <ul className="mt-2 list-disc space-y-2 pl-5">
        {learnings.map((item) => (
          <li key={item}>{withCode(item)}</li>
        ))}
      </ul>

      <div className="mt-8">
        <Button
          render={
            <a
              href={`mailto:ongjohnmarkc@gmail.com?subject=${encodeURIComponent(emailSubject)}`}
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
