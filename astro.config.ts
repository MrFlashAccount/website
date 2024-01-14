// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference
// @ts-check
import { defineConfig } from "astro/config";
import posthtml from "posthtml";
import htmlnano from "htmlnano";
import { transform } from "lightningcss";
import minifyClassnames from "posthtml-minify-classnames";
import { readFileSync, writeFileSync } from "node:fs";

export default defineConfig({
	outDir: "./public",
	publicDir: "./src/public/",
	site: "https://garin.dev",
	vite: { build: { assetsInlineLimit: 0 } },
	adapter: {
		name: "test",
		hooks: {
			"astro:build:done": async ({ routes }) => {
				const files = routes
					.filter((route) => route.type === "page")
					.map(({ distURL }) => distURL)
					.filter((url): url is URL => typeof url !== 'undefined');

				for (const { pathname } of files) {
					const htmlFile = readFileSync(pathname, "utf-8");

					const { html } = await posthtml()
						.use(
							minifyClassnames({
								genNameClass: "genNameEmoji",
								genNameId: "genNameEmoji",
							}),
						)
						.use(
							htmlnano({
								collapseAttributeWhitespace: true,
								collapseBooleanAttributes: { amphtml: false },
								collapseWhitespace: "aggressive",
								deduplicateAttributeValues: true,
								normalizeAttributeValues: true,
								minifyConditionalComments: true,
								removeAttributeQuotes: true,
								removeEmptyAttributes: true,
								removeRedundantAttributes: true,
								removeUnusedCss: true,
								minifySvg: false,
								minifyCss: false,
								minifyJs: false,
								removeComments: true,
							}),
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
							}),
						)
						.process(htmlFile);

					writeFileSync(pathname, html, "utf-8");
				}
			},
		},
	},
});
