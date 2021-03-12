module.exports = {
  siteMetadata: {
    siteUrl: "https://garin.dev",
    title: "Sergey Garin's website",
  },
  plugins: [
    `gatsby-plugin-sass`,
    "gatsby-plugin-postcss",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Sergey Garin's website`,
        short_name: `Sergey Garin's website`,
        start_url: `/`,
        background_color: `#fff`,
        display: `standalone`,
        icon: `src/images/favicon/icon.svg`,
      },
    },
    "gatsby-plugin-no-javascript",
  ],
};
