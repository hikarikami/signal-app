import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button-variants"

const getInitialTheme = () => {
  const storedTheme = window.localStorage.getItem("theme")

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const isDark = theme === "dark"

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem("theme", theme)
  }, [isDark, theme])

  return (
    <main className="min-h-svh bg-background text-foreground">
      <div className="mx-auto flex min-h-svh w-full max-w-5xl flex-col px-6 py-6">
        <header className="flex items-center justify-between border-b pb-4">
          <a className="text-sm font-medium tracking-normal" href="/">
            Vite + shadcn/ui
          </a>
          <Button
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            size="icon"
            type="button"
            variant="outline"
          >
            {isDark ? <Sun /> : <Moon />}
          </Button>
        </header>

        <section className="grid flex-1 place-items-center py-16 text-center">
          <div className="max-w-2xl space-y-6">
            <div className="mx-auto inline-flex rounded-full border bg-muted px-3 py-1 text-sm text-muted-foreground">
              Ready for your app
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-normal text-balance sm:text-6xl">
                Build from a clean shadcn starting point.
              </h1>
              <p className="mx-auto max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                The default Vite welcome screen is gone. Tailwind, shadcn
                tokens, and a persistent light/dark mode switch are set up for
                the next thing you want to make.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                className={buttonVariants({ size: "lg" })}
                href="https://ui.shadcn.com/docs"
                rel="noreferrer"
                target="_blank"
              >
                shadcn docs
              </a>
              <a
                className={buttonVariants({ size: "lg", variant: "outline" })}
                href="https://vite.dev/guide/"
                rel="noreferrer"
                target="_blank"
              >
                Vite guide
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
