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
            "getting-started/introduction",
            "getting-started/installation",
            "getting-started/quick-start",
          ],
        },
        {
          label: "Guides",
          // autogenerate: { directory: "reference" },
          items: [
            // Each item here is one entry in the navigation menu.
            "guides/reverse-proxy",
            "guides/load-balancing",
            "guides/static-file-serving",
            "guides/redirections",
            "guides/tls-https",
            "guides/http-headers",
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
