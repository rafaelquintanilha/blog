import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import 'flag-icon-css/css/flag-icon.css'
import Footer from '../components/Footer'
import css from './index.module.css'
import Subscribe from '../components/Subscribe'
import SEO from '../components/SEO'

export default class BlogIndex extends React.Component {
  constructor() {
    super()
    this.state = { filter: 'all' }
  }

  getFlagCode(lang) {
    if (lang === 'pt-br') return 'br'
    if (lang === 'en-us') return 'us'
    return ''
  }

  get filter() {
    return (
      <div className={css.filter_container}>
        <label htmlFor="home-language-select">Show:</label>
        <select
          id="home-language-select"
          value={this.state.filter}
          onChange={e => this.setState({ filter: e.target.value })}
        >
          <option value="all">All</option>
          <option value="en-us">English</option>
          <option value="pt-br">Português</option>
        </select>
      </div>
    )
  }

  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    return (
      <Layout>
        <SEO />
        {this.filter}
        <div className={css.posts_container}>
          {posts
            .filter(
              ({ node }) =>
                this.state.filter === 'all' ||
                node.frontmatter.lang === this.state.filter
            )
            .map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug
              return (
                <div key={node.fields.slug}>
                  <h3 style={{ marginBottom: '12px', marginTop: '60px' }}>
                    <Link className={css.link_title} to={node.fields.slug}>
                      {title}
                    </Link>
                  </h3>
                  <small style={{ color: 'rgba(0,0,0,.54)' }}>
                    <span
                      style={{ width: '1em' }}
                      className={`flag-icon flag-icon-${this.getFlagCode(
                        node.frontmatter.lang
                      )}`}
                    />{' '}
                    {node.frontmatter.date}
                    {' • '}
                    <span>{node.timeToRead + ' min read'}</span>
                  </small>
                  <p
                    style={{ marginTop: '8px' }}
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.spoiler,
                    }}
                  />
                </div>
              )
            })}
        </div>
        <Subscribe />
        <hr style={{ marginTop: '50px' }} />
        <Footer />
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          timeToRead
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            spoiler
            lang
          }
        }
      }
    }
  }
`
