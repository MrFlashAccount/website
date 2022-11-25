// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference
// @ts-check
import { defineConfig } from "astro/config";
import image from "@astrojs/image";
import posthtml from "posthtml";
import { transform } from "lightningcss";
import minifyClassnames from "posthtml-minify-classnames";
import htmlnano from "htmlnano";
import { minify, createConfiguration } from "@minify-html/js";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

export default defineConfig({
  outDir: "./public",
  publicDir: "./src/public/",
  site: "https://garin.dev",
  vite: { build: { assetsInlineLimit: 0 } },
  integrations: [image()],
  adapter: {
    name: "test",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const files = readdirSync(fileURLToPath(dir), {
          withFileTypes: true,
          encoding: "utf-8",
        }).filter((dirent) => dirent.isFile() && dirent.name.endsWith(".html"));

        for (const { name } of files) {
          const filePath = fileURLToPath(new URL(name, dir));
          const htmlFile = readFileSync(
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
                removeUnusedCss: true,
                minifyJs: false,
                removeComments: true,
              })
            )
            .use((tree) =>
              tree.match({ tag: "style" }, (node) => {
                if (node.content) {
                  const { code } = transform({
                    filename: "",
                    code: Buffer.from(node.content[0] as string),
                    minify: true,
                  });

                  node.content[0] = code.toString();
                }

                return node;
              })
            )
            .process(htmlFile);

          writeFileSync(filePath, minifyHTML(html), "utf-8");
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
