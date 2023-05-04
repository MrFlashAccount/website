/**
 * @type {import('prettier').Config}
 */
const config = {
	useTabs: true,
	tailwindConfig: "./tailwind.config.js",
	tabWidth: 2,
	tailwindFunctions: ["twMerge", "tw", "twJoin"],
	plugins: [
		require.resolve("prettier-plugin-astro"),
		require.resolve("prettier-plugin-tailwindcss"),
	],
	overrides: [
		{
			files: [".*", "*.json", "*.md", "*.toml", "*.yml"],
			options: { useTabs: false },
		},
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
	],
};

module.exports = config;
