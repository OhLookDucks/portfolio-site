import { defineConfig } from "vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import netlify from "@netlify/vite-plugin-tanstack-start"
import viteReact from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackStart(),
    // Our site has no edge functions (SSR runs on Netlify Functions), and the
    // local edge-functions emulator crashes with the bundled Deno version, so
    // it is switched off for `vite dev` only.
    netlify({ dev: { edgeFunctions: { enabled: false } } }),
    viteReact(),
  ],
})

export default config
