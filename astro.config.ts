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
			"astro:build:done": async ({ routes, dir, assets }) => {
				const paths = [...assets.values()]
					.filter((urls) => urls.some((url) => url.pathname.endsWith(".html")))
					.flatMap((urls) => urls.map((url) => url.pathname));

				await Promise.all([
					extractCharsFromHtml(
						paths,
						(node) => !node.attrs?.class?.includes("font-semibold"),
					).then((chars) =>
						minifyFont(chars, {
							src: dir.pathname + "_astro/*-400*.otf",
							dest: dir.pathname + "_astro/",
						}),
					),
					extractCharsFromHtml(
						paths,
						(node) => !!node.attrs?.class?.includes("font-semibold"),
					).then((chars) =>
						minifyFont(chars, {
							src: dir.pathname + "_astro/*-600*.otf",
							dest: dir.pathname + "_astro/",
						}),
					),
					minifyHtml(paths),
				]);
			},
		},
	},
});
