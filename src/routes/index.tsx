import { createFileRoute } from "@tanstack/react-router"
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
      {/* Hero — wording, photo and styling carried over from the old site */}
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
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=ongjohnmarkc@gmail.com&su=Hello%20John%20Mark"
                  target="_blank"
                  rel="noreferrer"
                />
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

      {/* About — wording carried over from the old site */}
      <section className="mx-auto max-w-5xl px-4 pb-16">
        <h2 className="text-2xl font-bold">About me</h2>
        <p className="mt-3 max-w-3xl">
          I&rsquo;ve spent over four years helping people with billing
          questions, device setups, and reservations, on the phone, in chat,
          and by email. I&rsquo;m careful with details, calm when things change
          fast, and I like finding ways to make a repeated task easier.
        </p>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          Based in Cebu, Philippines. Comfortable working across time zones,
          with a dedicated home office and reliable fiber internet.
        </p>
      </section>
    </>
  )
}
