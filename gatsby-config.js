const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"
require("dotenv").config({
  path: `.env.${activeEnv}`,
})
module.exports = {
  pathPrefix: `custom-gatsby-contentful-build`, // for GitHub pages
  siteMetadata: {
    title: `Custom Gatsby Contentful Build`,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    author: `@monkishtypist`,
    siteUrl: 'https://www.loremipsum.com'
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
        accessToken: process.env.GATSBY_CONTENTFUL_TOKEN_ID,
        downloadLocal: process.env.GATSBY_CONTENTFUL_DOWNLOAD_LOCAL,
        useNameForId: false,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `placeholder`,
        // path is required param, so let's just point it to single file to not create
        // much unnecessary work for it
        path: `${__dirname}/gatsby-config.js`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
  ],
}
