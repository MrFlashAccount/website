import { readFileSync, writeFileSync } from "node:fs";
import posthtml from "posthtml";
import minifyClassnames from "posthtml-minify-classnames";
import htmlnano from "htmlnano";
import { transform } from "lightningcss";

/**
 * @param {string[]} pathnames
 * @return {Promise<void>}
 */
export async function minifyHtml(pathnames) {
	for (const pathname of pathnames) {
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
							code: Buffer.from(node.content[0]),
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
}
