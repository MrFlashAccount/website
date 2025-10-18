// @ts-check

/**
 * @type {import('prettier').Config}
 */
const config = {
	useTabs: true,
	tailwindConfig: "./tailwind.config.js",
	tabWidth: 2,
	tailwindFunctions: ["twMerge", "tw", "twJoin"],
	plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
	overrides: [
		{ files: [".*", "*.md", "*.toml", "*.yml"], options: { useTabs: false } },
		{ files: "*.astro", options: { parser: "astro" } },
	],
};

module.exports = config;
