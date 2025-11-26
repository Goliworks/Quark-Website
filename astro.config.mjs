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
            "getting-started/introduction",
            "getting-started/installation",
            "getting-started/quick-start",
          ],
        },
        {
          label: "Guides",
          // autogenerate: { directory: "reference" },
          items: [
            "guides/configuration",
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
          items: [
            { label: "Global", slug: "reference/global" },
            { label: "Servers", slug: "reference/servers" },
            { label: "Services", slug: "reference/services" },
            { label: "Locations", slug: "reference/locations" },
            { label: "File servers", slug: "reference/file-servers" },
            { label: "Redirections", slug: "reference/redirections" },
            { label: "Load Balancers", slug: "reference/load-balancers" },
          ],
        },
      ],
      customCss: ["./src/styles/theme.css"],
      components: {
        Footer: "./src/components/footer.astro",
      },
    }),
  ],
});
