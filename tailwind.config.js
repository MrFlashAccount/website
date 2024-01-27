/**
 * @type {import('tailwindcss').Config}
 */
const config = {
	content: [
		"./public/**/*.html",
		"./src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}",
	],
	theme: {
		extend: {
			fontFamily: { sans: ["OpenRunde", "OpenRunde Fallback"] },
			keyframes: { "move-bg": { to: { backgroundPosition: "400% 0" } } },
			animation: { "move-bg": "move-bg 7s infinite linear" },
		},
	},
};

module.exports = config;
