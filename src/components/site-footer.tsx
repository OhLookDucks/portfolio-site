import { Link } from "@tanstack/react-router"

// Shared footer, shown on every page (matches the old site's footer).
export function SiteFooter() {
  return (
    <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
      © John Mark Ong
      <span className="mx-2">·</span>
      <Link
        to="/privacy"
        className="underline underline-offset-4 hover:text-foreground"
      >
        Privacy
      </Link>
    </footer>
  )
}
