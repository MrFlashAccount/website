// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference
// @ts-check
import { defineConfig } from "astro/config";
import { minifyHtml } from "./scripts/minify-html";
import { minifyFont } from "./scripts/minify-font";
import { extractCharsFromHtml } from "./scripts/extract-chars-from-html";

export default defineConfig({
	outDir: "./public",
	publicDir: "./src/public/",
	site: "https://garin.dev",
	vite: { build: { assetsInlineLimit: 0 } },
	adapter: {
		name: "minify",
		hooks: {
			"astro:build:done": async ({ routes, dir }) => {
				const paths = routes
					.filter((route) => route.type === "page")
					.map(({ distURL }) => distURL)
					.filter((url): url is URL => typeof url !== "undefined")
					.map((url) => url.pathname);

				await Promise.all([
					extractCharsFromHtml(paths).then((chars) =>
						minifyFont(chars, {
							src: dir.pathname + "_astro/*.otf",
							dest: dir.pathname + "_astro/",
						}),
					),
					minifyHtml(paths),
				]);
			},
		},
	},
});
