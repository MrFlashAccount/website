/**
 * @type {import('tailwindcss').TailwindConfig}
 */
const config = {
	content: [
		"./public/**/*.html",
		"./src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Lato", "Lato Fallback"],
			},
			keyframes: {
				"move-bg": {
					to: {
						backgroundPosition: "400% 0",
					},
				},
			},
			animation: {
				"move-bg": "move-bg 7s infinite linear",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};

module.exports = config;
