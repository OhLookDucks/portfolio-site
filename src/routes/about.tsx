import { createFileRoute } from "@tanstack/react-router"

// Placeholder — the real About page (with photo) is built in the next step
export const Route = createFileRoute("/about")({
  component: () => (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-3xl font-extrabold">About me</h1>
      <p className="mt-3 text-muted-foreground">Coming next in the migration.</p>
    </section>
  ),
})
