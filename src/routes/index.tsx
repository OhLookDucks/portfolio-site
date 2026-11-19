import { createFileRoute, Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "John Mark Ong – Support Operations & Automation" },
      {
        name: "description",
        content:
          "Customer support professional building automations for support teams.",
      },
    ],
  }),
  component: Home,
})

function Home() {
  return (
    <>
      {/* Hero: wording, photo and styling carried over from the old site */}
      <section className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-14 md:grid-cols-[1fr_300px]">
        <div>
          <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            Open to support operations and automation roles
          </span>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
            Hi, I&rsquo;m John Mark. I help customers get unstuck, and I&rsquo;m
            learning to automate the busywork.
          </h1>
          <p className="mt-4 text-muted-foreground">
            Four years in customer support across telecom and SaaS, now
            building small automations to show how I&rsquo;d make a support
            team&rsquo;s day easier.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {/* Base UI buttons become links through the render prop */}
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
              render={<a href="/JohnMark_Ong_CV.pdf" download />}
              nativeButton={false}
            >
              Download CV
            </Button>
          </div>
        </div>
        <img
          src="/john-mark-ong.jpg"
          alt="Photo of John Mark Ong"
          className="aspect-square w-full max-w-[300px] rounded-[28px] border-[5px] border-card object-cover shadow-[0_14px_34px_rgba(36,50,56,0.16)]"
        />
      </section>

      {/* Short pointer: the evidence lives on the About page (site review 2026-11-20) */}
      <section className="mx-auto max-w-5xl px-4 pb-16">
        <h2 className="text-2xl font-bold">About me</h2>
        <p className="mt-3 max-w-3xl">
          Four years in support across telecom and SaaS, and a habit of
          fixing repeated problems at the root, now pointed at automation.
        </p>
        <Link
          to="/about"
          className="mt-2 inline-block text-muted-foreground underline underline-offset-4"
        >
          The full story, with numbers →
        </Link>
      </section>
    </>
  )
}
