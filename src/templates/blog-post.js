import React from 'react';
import { Link, graphql } from 'gatsby';
import "katex/dist/katex.min.css";
import { rhythm, scale } from '../utils/typography';
import Bio from '../components/Bio';
import Layout from '../components/Layout';
import Subscribe from '../components/Subscribe';
import TwitterButton from '../components/TwitterButton';
import SEO from '../components/SEO';

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const { previous, next, slug } = this.props.pageContext;
    return (
      <Layout>
        <SEO 
          slug={slug} 
          type="article" 
          description={post.frontmatter.spoiler} 
          title={post.frontmatter.title}
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
          <span>{post.timeToRead} min read</span>
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
        <div id="amzn-assoc-ad-52287c01-f859-4702-b701-fef310cd19f5"></div>
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

export default BlogPostTemplate;

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
      }
    }
  }
`;