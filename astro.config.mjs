// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference
// @ts-check

export default /** @type {import('astro').AstroUserConfig} */ ({
  dist: "./public",
  public: "./src/public/",
  buildOptions: { site: "https://garin.dev" },
});
