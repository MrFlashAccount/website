import { readFileSync } from "node:fs";
import posthtml from "posthtml";

/**
 * @param {string[]} pathnames
 * @return {Promise<string>}
 */
export async function extractCharsFromHtml(pathnames) {
	let allText = "";

	/**
	 * @param {import("posthtml").Node} node
	 */
	function walk(node) {
		if (node.tag === "style") {
			return;
		}

		if (node.tag === "script") {
			return;
		}

		if (node.content) {
			node.content.forEach((child) => {
				if (typeof child === "string") {
					return (allText += child);
				}

				walk(child);
			});
		}
	}

	for (const pathname of pathnames) {
		await posthtml()
			.use((tree) => {
				tree.match({ tag: "body" }, (node) => {
					walk(node);
					return node;
				});

				return tree;
			})
			.process(readFileSync(pathname, "utf-8"));
	}

	return [...new Set(allText)].sort().join("");
}
