import { createFileRoute } from "@tanstack/react-router"

// Placeholder — the real Contact page (with CV download) is built in an upcoming step
export const Route = createFileRoute("/contact")({
  component: () => (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-3xl font-extrabold">Let's talk</h1>
      <p className="mt-3 text-muted-foreground">Coming next in the migration.</p>
    </section>
  ),
})
