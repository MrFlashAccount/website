const commonPlugins = [require("tailwindcss"), require("autoprefixer")];
// const productionPlugins = [require("postcss-variable-compress")];

module.exports = () => ({
  plugins: [
    ...commonPlugins,
    // ...[process.env.NODE_ENV === "production" ? productionPlugins : []],
  ],
});
