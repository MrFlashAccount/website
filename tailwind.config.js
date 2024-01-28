/**
 * @type {import('tailwindcss').Config}
 */
const config = {
	content: [
		"./public/**/*.html",
		"./src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}",
	],
	theme: {
		fontSize: {
			lg: ["18px", "24px"],
			xl: ["20px", "26px"],
			"2xl": ["24px", "30px"],
			"4xl": ["36px", "44px"],
			"5xl": ["48px", "56px"],
		},
		extend: {
			fontFamily: { sans: ["OpenRunde", "OpenRunde Fallback"] },
			keyframes: { "move-bg": { to: { backgroundPosition: "400% 0" } } },
			animation: { "move-bg": "move-bg 7s infinite linear" },
			lineHeight: { 0: "0" },
		},
	},
	corePlugins: {
		preflight: false,
		filter: false,
	},
};

module.exports = config;
