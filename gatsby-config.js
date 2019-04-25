module.exports = {
  siteMetadata: {
    title: 'Rafael Quintanilha',
    author: 'Rafael Quintanilha',
    description: 'Personal space for Rafael Quintanilha. Web Development. Front-end. React. UI/UX. Accessibility. May have politics.',
    siteUrl: 'https://rafaelquintanilha.com',
    social: {
      twitter: '@rgsquintanilha',
    },
  },
  pathPrefix: '/',
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-autolink-headers`,
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          `gatsby-remark-katex`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-64315802-1`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Rafael Quintanilha`,
        short_name: `RQ`,
        start_url: `/`,
        background_color: `#003380`,
        theme_color: `#003380`,
        display: `minimal-ui`,
        icon: `src/assets/logo-square.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    `gatsby-plugin-twitter`
  ],
}
