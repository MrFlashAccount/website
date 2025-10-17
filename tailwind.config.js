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
			"5xl": ["48px", "56px"],
			"6xl": ["60px", "68px"],
			"7xl": ["72px", "80px"],
		},
		extend: {
			fontFamily: {
				sans: ["OpenRunde", "OpenRunde Fallback"],
				mono: [
					"ui-monospace",
					"SFMono-Regular",
					"Menlo",
					"Monaco",
					"Consolas",
					"Liberation Mono",
					"Courier New",
					"monospace",
				],
			},
			colors: {
				primary: {
					50: "#f8fafc",
					100: "#f1f5f9",
					200: "#e2e8f0",
					300: "#cbd5e1",
					400: "#94a3b8",
					500: "#64748b",
					600: "#475569",
					700: "#334155",
					800: "#1e293b",
					900: "#0f172a",
				},
				accent: {
					50: "#fafaf9",
					100: "#f5f5f4",
					200: "#e7e5e4",
					300: "#d6d3d1",
					400: "#a8a29e",
					500: "#78716c",
					600: "#57534e",
					700: "#44403c",
					800: "#292524",
					900: "#1c1917",
				},
			},
			keyframes: {
				"move-bg": { to: { backgroundPosition: "400% 0" } },
				gradient: {
					"0%, 100%": { backgroundPosition: "0% 50%" },
					"50%": { backgroundPosition: "100% 50%" },
				},
				"fade-in-up": {
					"0%": { opacity: "0", transform: "translateY(20px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				float: {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-10px)" },
				},
				glow: {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0.5" },
				},
			},
			animation: {
				"move-bg": "move-bg 7s infinite linear",
				gradient: "gradient 8s ease infinite",
				"fade-in-up": "fade-in-up 0.8s ease-out forwards",
				float: "float 3s ease-in-out infinite",
				glow: "glow 2s ease-in-out infinite",
			},
			lineHeight: { 0: "0" },
			spacing: {
				18: "4.5rem",
				88: "22rem",
			},
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
