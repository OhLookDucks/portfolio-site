import { Link } from "@tanstack/react-router"

// Shared top navigation, shown on every page.
// Links use TanStack Router's Link (typed), not plain <a> tags.
export function SiteHeader() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3">
        <Link
          to="/"
          className="text-lg font-extrabold tracking-tight text-foreground"
        >
          John Mark Ong
        </Link>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link to="/about" className="transition-colors hover:text-primary">
            About
          </Link>
          <Link to="/projects" className="transition-colors hover:text-primary">
            Projects
          </Link>
          <Link to="/skills" className="transition-colors hover:text-primary">
            Skills
          </Link>
          <Link to="/contact" className="transition-colors hover:text-primary">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}
