import { createFileRoute } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact – John Mark Ong" },
      {
        name: "description",
        content:
          "Looking for a support operations or automation role. Email is the quickest way to reach me.",
      },
    ],
  }),
  component: Contact,
})

function Contact() {
  return (
    <>
      {/* Dark console band, direction C (2026-11-21) */}
      <section className="bg-[#1d2b31] text-[#e8eef0]">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h1 className="text-3xl font-extrabold">Let&rsquo;s talk</h1>
          <p className="mt-2 text-white/70">
            Looking for a support operations or automation role. Email is the
            quickest way to reach me.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
      {/* Sand card, like the old contact section */}
      <div className="max-w-3xl rounded-lg border border-border bg-sand p-6">
        <div className="flex flex-wrap gap-3">
          <Button
            render={
              <a href="mailto:ongjohnmarkc@gmail.com?subject=Hello%20John%20Mark" />
            }
            nativeButton={false}
          >
            Email me
          </Button>
          <Button
            variant="outline"
            render={<a href="https://www.linkedin.com/in/johnmarkong" />}
            nativeButton={false}
          >
            LinkedIn
          </Button>
          <Button
            variant="outline"
            render={<a href="/JohnMark_Ong_CV.pdf" download />}
            nativeButton={false}
          >
            Download CV
          </Button>
        </div>
        {/* Plain-text address: recruiters use every mail tool, not just Gmail */}
        <p className="mt-4 text-sm text-muted-foreground">
          ongjohnmarkc@gmail.com
        </p>
      </div>
      </section>
    </>
  )
}
