import React from 'react'
import { Link, graphql } from 'gatsby'
import Bio from '../components/Bio'
import Layout from '../components/Layout'
import Subscribe from '../components/Subscribe'
import TwitterButton from '../components/TwitterButton'
import SEO from '../components/SEO'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const { previous, next, slug } = this.props.pageContext
    return (
      <Layout>
        <SEO
          slug={slug}
          type="article"
          description={post.frontmatter.spoiler}
          title={post.frontmatter.title}
          canonical={post.frontmatter.canonical}
        />
        <h1 style={{ marginBottom: '8px' }}>{post.frontmatter.title}</h1>
        <p
          style={{
            fontSize: '18px',
            display: 'block',
            marginBottom: '0',
            marginTop: '0',
            color: 'rgba(0,0,0,.54)',
          }}
        >
          {post.frontmatter.date}
          {' • '}
          <span>{post.timeToRead} min read</span>
        </p>
        <p
          style={{
            fontSize: '16px',
            display: 'block',
            fontStyle: 'italic',
          }}
        >
          Last reviewed {post.frontmatter.lastReview}
        </p>
        <TwitterButton center={false} />
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <TwitterButton />
        <Subscribe />
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
            marginTop: '60px',
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
        <hr style={{ marginTop: '40px' }} />
        <Bio />
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
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
        canonical
      }
    }
  }
`
