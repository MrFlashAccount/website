import { readFileSync, writeFileSync } from "node:fs";
import { transformSync as esbuildTransform } from "esbuild";
import posthtml from "posthtml";
import minifyClassnames from "posthtml-minify-classnames";
import htmlnano from "htmlnano";
import { transform as lightningcssTransform } from "lightningcss";

/**
 * @param {string[]} pathnames
 * @return {Promise<void>}
 */
export async function minifyHtml(pathnames) {
	for (const pathname of pathnames) {
		const htmlFile = readFileSync(pathname, "utf-8");

		const { html } = await posthtml()
			.use(minifyClassnames({ genNameClass: "genName", genNameId: false }))
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
						const { code } = lightningcssTransform({
							filename: "",
							code: Buffer.from(node.content[0]),
							minify: true,
						});

						node.content[0] = code.toString();
					}

					return node;
				}),
			)
			.use(async (tree) =>
				tree.match({ tag: "script" }, (node) => {
					if (node.content) {
						node.content[0] = esbuildTransform(node.content[0], {
							minify: true,
						}).code;
					}
					return node;
				}),
			)
			.process(htmlFile);

		writeFileSync(pathname, html, "utf-8");
	}
}
