// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "My Docs",
      logo: {
        light: "./src/assets/quark-logo-black.svg",
        dark: "./src/assets/quark-logo-white.svg",
        replacesTitle: true,
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/Goliworks/Quark",
        },
      ],
      sidebar: [
        {
          label: "Getting started",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Installation", slug: "getting_started/installation" },
            { label: "Quick start", slug: "getting_started/quick_start" },
          ],
        },
        {
          label: "Guides",
          // autogenerate: { directory: "reference" },
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Reverse proxy", slug: "guides/reverse_proxy" },
            { label: "Load blancing", slug: "guides/load_balancing" },
            {
              label: "Static File Serving",
              slug: "guides/static_file_serving",
            },
            {
              label: "Redirections",
              slug: "guides/redirections",
            },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
      customCss: ["./src/styles/theme.css"],
      components: {
        Footer: "./src/components/footer.astro",
      },
    }),
  ],
});
