import alpinejs from "@astrojs/alpinejs"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
    site: "https://tepungbumbu.github.io",
    vite: {
        build: {
            cssCodeSplit: false,
        },
        css: {
            preprocessorOptions: {
                scss: {
                    api: "modern-compiler",
                },
            },
        },
        plugins: [tailwindcss()],
    },
    integrations: [sitemap(), react(), alpinejs({ entrypoint: "/src/entrypoint" })],
    build: {
        assets: "_assets",
        inlineStylesheets: "never",
    },
    base: "/",
    compressHTML: false,
    output: "static",
    outDir: "dist",
})
