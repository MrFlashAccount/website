// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference
// @ts-check
import { defineConfig } from "astro/config";
import posthtml from "posthtml";
import minifyClassnames from "posthtml-minify-classnames";
import htmlnano from "htmlnano";
import { minify, createConfiguration } from "@minify-html/js";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

export default defineConfig({
  dist: "./public",
  public: "./src/public/",
  buildOptions: { site: "https://garin.dev" },
  vite: { build: { assetsInlineLimit: 0 } },
  adapter: {
    name: "test",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        if (process.env.NODE_ENV !== "production") return;

        const files = fs
          .readdirSync(fileURLToPath(dir), {
            withFileTypes: true,
            encoding: "utf-8",
          })
          .filter(({ isFile, name }) => isFile && name.endsWith(".html"));

        for (const { name } of files) {
          const filePath = fileURLToPath(new URL(name, dir));
          const htmlFile = fs.readFileSync(
            fileURLToPath(new URL(name, dir)),
            "utf-8"
          );

          const { html } = await posthtml()
            .use(
              minifyClassnames({
                genNameClass: "genNameEmoji",
                genNameId: "genNameEmoji",
              })
            )
            .use(
              htmlnano({
                removeUnusedCss: { tool: "purgeCSS" },
                minifyJs: false,
              })
            )
            .use((tree) =>
              tree.match(
                { tag: "link", attrs: { rel: "stylesheet" } },
                () => null
              )
            )
            .process(htmlFile);

          fs.writeFileSync(filePath, minifyHTML(html), "utf-8");
        }
      },
    },
  },
});

function minifyHTML(
  html: string,
  config: Parameters<typeof createConfiguration>[0] = {}
): string {
  const minifyConfig = createConfiguration({ ...config });

  return minify(html, minifyConfig).toString();
}
