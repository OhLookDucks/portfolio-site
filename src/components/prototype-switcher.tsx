import { useEffect } from "react"
import { Link } from "@tanstack/react-router"

// PROTOTYPE: floating variant switcher — throwaway, removed once the
// winning design is folded into the real page.
export function PrototypeSwitcher({
  variants,
  current,
}: {
  variants: { key: string; name: string }[]
  current: string
}) {
  const index = variants.findIndex((v) => v.key === current)
  const prev = variants[(index - 1 + variants.length) % variants.length]
  const next = variants[(index + 1) % variants.length]

  // Arrow keys cycle variants, unless the user is typing in a field
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const tag = (event.target as HTMLElement)?.tagName
      if (tag === "INPUT" || tag === "TEXTAREA" || (event.target as HTMLElement)?.isContentEditable) {
        return
      }
      if (event.key === "ArrowLeft") window.location.search = `?variant=${prev.key}`
      if (event.key === "ArrowRight") window.location.search = `?variant=${next.key}`
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [prev.key, next.key])

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-3 rounded-full bg-zinc-900 px-4 py-2 text-white shadow-lg">
        <Link
          to="/projects/downloads-auto-sorter"
          search={{ variant: prev.key }}
          className="rounded-full px-2 py-0.5 hover:bg-zinc-700"
          aria-label="Previous variant"
        >
          ←
        </Link>
        <span className="text-sm font-medium">
          {variants[index]?.key} — {variants[index]?.name}
        </span>
        <Link
          to="/projects/downloads-auto-sorter"
          search={{ variant: next.key }}
          className="rounded-full px-2 py-0.5 hover:bg-zinc-700"
          aria-label="Next variant"
        >
          →
        </Link>
      </div>
    </div>
  )
}
