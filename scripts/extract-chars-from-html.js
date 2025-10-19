import { readFileSync } from "node:fs";
import posthtml from "posthtml";

const IGNORED_TAGS = [
	"style",
	"script",
	"noscript",
	"svg",
	"path",
	"img",
	"iframe",
	"meta",
];

const DYNAMIC_TAGS = ["input", "textarea", "select"];
const IGNORED_LETTERS = ["\n", "\r", "\t", " "];

/**
 * @param {string[]} pathnames
 * @param {(node: import("posthtml").Node) => boolean} [filter]
 * @return {Promise<string>}
 */
export async function extractCharsFromHtml(pathnames, filter = () => true) {
	let allText = "";

	/**
	 * @param {import("posthtml").Node} node
	 */
	function walk(node) {
		if (typeof node === "string") {
			allText += node.trim();
		} else if (node.content) {
			node.content.forEach((child) => {
				if (typeof child === "string" && filter(node)) {
					allText += child.trim();
					return;
				}

				if (DYNAMIC_TAGS.includes(child?.tag?.toLowerCase())) {
					throw new Error(`Found dynamic tag "${child?.tag}" in HTML.`);
				}

				if (IGNORED_TAGS.includes(child?.tag?.toLowerCase())) {
					return;
				}

				if (child != null && child.content != null) {
					walk(child);
				}
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

	return [...new Set(allText)]
		.filter((letter) => !IGNORED_LETTERS.includes(letter))
		.join("");
}
