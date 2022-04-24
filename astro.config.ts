// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference
// @ts-check
import { parse } from "node-html-parser";
import { minify, createConfiguration } from "@minify-html/js";
import fs from "node:fs/promises";
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
      "astro:build:done": async (options) => {
        const files = await fs.readdir(fileURLToPath(options.dir), {
          withFileTypes: true,
        });
        const minifyConfig = createConfiguration({});

        return Promise.all(
          files
            .filter(({ isFile, name }) => isFile && name.endsWith(".html"))
            .map((htmlFile) => {
              const filePath = fileURLToPath(
                new URL(htmlFile.name, options.dir)
              );
              return fs
                .readFile(fileURLToPath(new URL(htmlFile.name, options.dir)), {
                  encoding: "utf-8",
                })
                .then((content) => [filePath, content]);
            })
        ).then((htmlFileContents) =>
          Promise.all(
            htmlFileContents.map(([path, htmlFileContent]) => {
              const root = parse(htmlFileContent);

              root
                .querySelectorAll("link[rel=stylesheet]")
                .forEach((linkElement) => {
                  // @ts-ignore
                  const stylesheetPath = linkElement.attrs.href.startsWith("/")
                    ? linkElement.attrs.href.slice(1)
                    : linkElement.attrs.href;
                  const path = resolve(
                    fileURLToPath(options.dir),
                    stylesheetPath
                  );
                  const stylesheetContent = readFileSync(path, {
                    encoding: "utf-8",
                  });
                  linkElement.replaceWith(
                    `<style>${stylesheetContent}</style>`
                  );
                });

              return fs.writeFile(
                path,
                minify(root.toString(), minifyConfig).toString(),
                { encoding: "utf-8" }
              );
            })
          )
        );
      },
    },
  },
};
