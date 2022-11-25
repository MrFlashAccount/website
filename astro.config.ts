// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference
// @ts-check
import { defineConfig } from "astro/config";
import posthtml from "posthtml";
// @ts-ignore
import minifyClassnames from "posthtml-minify-classnames";
import htmlnano from "htmlnano";
import { minify, createConfiguration } from "@minify-html/js";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

export default defineConfig({
  outDir: "./public",
  publicDir: "./src/public/",
  site: "https://garin.dev",
  vite: { build: { assetsInlineLimit: 0 } },
  adapter: {
    name: "test",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const files = fs
          .readdirSync(fileURLToPath(dir), {
            withFileTypes: true,
            encoding: "utf-8",
          })
          .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".html"));

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
            .use(htmlnano({ removeUnusedCss: true, minifyJs: false }))
            .use((tree) =>
              tree.match(
                { tag: "link", attrs: { rel: "stylesheet" } },
                () => []
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
