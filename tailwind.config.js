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
			sm: ["14px", "20px"],
			base: ["16px", "24px"],
			lg: ["18px", "28px"],
			xl: ["20px", "28px"],
			"2xl": ["24px", "32px"],
			"3xl": ["30px", "36px"],
			"4xl": ["36px", "44px"],
		},
		screens: {
			sm: "320px",
			md: "640px",
			lg: "860px",
		},
		extend: {
			fontFamily: {
				sans: ["OpenRunde", "OpenRunde Fallback"],
			},
			lineHeight: { 0: "0" },
		},
	},
	corePlugins: {
		preflight: false,
		filter: false,
	},
	experimental: {
		optimizeUniversalDefaults: true,
	},
};

module.exports = config;
