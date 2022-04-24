// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference
// @ts-check
import { parse, HTMLElement } from "node-html-parser";
import { minify, createConfiguration } from "@minify-html/js";
import fs from "node:fs";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

export default /** @type {import('astro').AstroUserConfig} */ {
  dist: "./public",
  public: "./src/public/",
  buildOptions: { site: "https://garin.dev" },
  adapter: {
    name: "test",
    hooks: {
      "astro:build:done": ({ dir }) => {
        const files = fs
          .readdirSync(fileURLToPath(dir), {
            withFileTypes: true,
            encoding: "utf-8",
          })
          .filter(({ isFile, name }) => isFile && name.endsWith(".html"));

        for (const { name } of files) {
          const filePath = fileURLToPath(new URL(name, dir));

          const root = parse(
            fs.readFileSync(fileURLToPath(new URL(name, dir)), "utf-8")
          );

          inlineCSS(root, dir);

          fs.writeFileSync(filePath, minifyHTML(root.toString()), "utf-8");
        }
      },
    },
  },
};

function minifyHTML(
  html: string,
  config: Parameters<typeof createConfiguration>[0] = {}
): string {
  const minifyConfig = createConfiguration({ ...config });

  return minify(html, minifyConfig).toString();
}

function inlineCSS(root: HTMLElement, outputDirectory: string): void {
  for (const linkElement of root.querySelectorAll("link[rel=stylesheet]")) {
    const href = linkElement.attrs.href;
    const stylesheetPath = href.startsWith("/") ? href.slice(1) : href;
    const path = resolve(fileURLToPath(outputDirectory), stylesheetPath);

    linkElement.replaceWith(`<style>${readFileSync(path, "utf-8")}</style>`);
  }
}
