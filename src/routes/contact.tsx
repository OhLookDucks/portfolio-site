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
    <section className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="text-3xl font-extrabold">Let&rsquo;s talk</h1>
      {/* Sand card, like the old contact section */}
      <div className="mt-6 max-w-3xl rounded-lg border border-border bg-sand p-6">
        <p>
          I&rsquo;m looking for a support operations or automation role. Email
          is the quickest way to reach me.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
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
      </div>
    </section>
  )
}
