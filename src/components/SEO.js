import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

function SEO({
  description,
  lang,
  meta,
  keywords,
  title,
  type,
  slug,
  canonical,
}) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            author
            description
            siteUrl
            social {
              twitter
            }
            image
          }
        }
      }
    `
  )

  const metaTitle = title
    ? `${title} | ${site.siteMetadata.title}`
    : site.siteMetadata.title
  const metaDescription = description || site.siteMetadata.description

  // If there is a slug, append it to the end of the site url
  const metaURL = slug
    ? `${site.siteMetadata.siteUrl}${slug}`
    : site.siteMetadata.siteUrl

  const metaImage = `${site.siteMetadata.siteUrl}${site.siteMetadata.image}`

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={metaTitle}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: metaTitle,
        },
        {
          property: 'og:site_name',
          content: metaTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: type,
        },
        {
          property: `og:url`,
          content: metaURL,
        },
        {
          property: `og:image`,
          content: metaImage,
        },
        {
          property: 'og:image:width',
          content: `512`,
        },
        {
          property: 'og:image:height',
          content: `512`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.social.twitter,
        },
        {
          name: `twitter:title`,
          content: metaTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: metaImage,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : []
        )
        .concat(meta)}
    >
      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [
    'react',
    'frontend',
    'web development',
    'gatsby',
    'accessibility',
    'a11y',
    'ui',
    'ux',
    'design',
    'technology',
  ],
  type: 'website',
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  slug: PropTypes.string,
  canonical: PropTypes.string,
}

export default SEO
