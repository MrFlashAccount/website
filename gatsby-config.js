module.exports = {
  siteMetadata: {
    siteUrl: "https://garin.dev",
    title: "Sergey Garin's website",
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-postcss",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-mdx",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    "gatsby-plugin-no-javascript",
  ],
};
