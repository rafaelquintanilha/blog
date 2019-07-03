import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import { rhythm, scale } from '../utils/typography'

import "katex/dist/katex.min.css"
import Subscribe from '../components/Subscribe';
import TwitterButton from '../components/TwitterButton';

class BlogPostTemplate extends React.Component {
  render() {
    const { data } = this.props;
    const post = data.markdownRemark
    const siteTitle = data.site.siteMetadata.title
    const title = `${post.frontmatter.title} | ${siteTitle}`;
    const siteImage = `${data.site.siteMetadata.siteUrl}${data.site.siteMetadata.image}`;
    const { previous, next, slug } = this.props.pageContext
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          title={title}
          meta={[
            {
              name: 'description', 
              content: post.frontmatter.spoiler,
            },
            {
              property: 'og:url',
              content: `${data.site.siteMetadata.siteUrl}${slug}`,
            },
            {
              property: 'og:title',
              content: title,
            },
            {
              property: 'og:site_name',
              content: title,
            },
            {
              property: 'og:description',
              content: post.frontmatter.spoiler,
            },
            {
              name: 'twitter:card',
              content: 'summary',
            },
            {
              name: 'twitter:creator',
              content: data.site.siteMetadata.social.twitter,
            },
            {
              name: 'twitter:title',
              content: title,
            },
            {
              name: 'twitter:description',
              content: post.frontmatter.spoiler,
            },
            {
              property: 'og:type',
              content: 'article',
            },
            {
              property: 'og:image',
              content: siteImage,
            },
            {
              property: 'twitter:image',
              content: siteImage,
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
              property: 'keywords',
              content: `react, frontend, web development, accessibility, a11y, ui, ux, design, technology`,
            },
          ]}
        />
        <h1>{post.frontmatter.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
            color: "rgba(0,0,0,.54)"
          }}
        >
          {post.frontmatter.date}
          {' • '}
          <span>{post.timeToRead + " min read"}</span>
        </p>
        <p
          style={{
            ...scale(-2 / 5),
            display: 'block',
            marginTop: rhythm(-1),
            fontStyle: 'italic'
          }}
        >
          Last reviewed {post.frontmatter.lastReview}
        </p>
        <TwitterButton center={false} />
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <TwitterButton />
        <Subscribe />
        <hr style={{marginTop: rhythm(1)}} />
        <Bio />
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          <li>
            {
              previous &&
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            }
          </li>
          <li>
            {
              next &&
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            }
          </li>
        </ul>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
        social {
          twitter
        }
        image
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        lastReview(formatString: "MMMM DD, YYYY")
        spoiler
      }
    }
  }
`
