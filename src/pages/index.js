import React from 'react';
import { Link, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../components/Layout';
import { rhythm } from '../utils/typography';
import 'flag-icon-css/css/flag-icon.css';
import Footer from '../components/Footer';
import css from './index.module.css';
import Subscribe from '../components/Subscribe';

export default class BlogIndex extends React.Component {
  constructor() {
    super();
    this.state = { filter: "all" };
  }

  getFlagCode(lang) {
    if ( lang === "pt-br" ) return "br";
    if ( lang === "en-us" ) return "us";
    return "";
  }

  get filter() {
    return (
      <div style={{
        marginTop: "20px", 
        marginBottom: "20px", 
        width: "100%", 
        textAlign: "right"
        }}>
        <label htmlFor="home-language-select" style={{marginRight: "10px"}}>Show:</label>
        <select
          id="home-language-select" 
          value={this.state.filter} 
          onChange={e => this.setState({filter: e.target.value})}>
          <option value="all">All</option>
          <option value="en-us">English</option>
          <option value="pt-br">Português</option>
        </select>
      </div>
    );
  }

  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const siteDescription = data.site.siteMetadata.description;
    const siteImage = `${data.site.siteMetadata.siteUrl}${data.site.siteMetadata.image}`;
    const posts = data.allMarkdownRemark.edges;
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          title={siteTitle}
          meta={[
            {
              name: 'description', 
              content: siteDescription,
            },
            {
              property: 'og:url',
              content: data.site.siteMetadata.siteUrl,
            },
            {
              property: 'og:title',
              content: siteTitle,
            },
            {
              property: 'og:site_name',
              content: siteTitle,
            },
            {
              property: 'og:type',
              content: 'website',
            },
            {
              property: 'og:description',
              content: siteDescription,
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
              content: siteTitle,
            },
            {
              name: 'twitter:description',
              content: siteDescription,
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
        {this.filter}
        <div className={css.posts_container}>
          {posts
            .filter(({node}) => this.state.filter === "all" || node.frontmatter.lang === this.state.filter)
            .map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug
              return (
                <div key={node.fields.slug}>
                  <h3 style={{marginBottom: rhythm(1 / 4)}}>
                    <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>{title}</Link>
                  </h3>
                  <small style={{color: "rgba(0,0,0,.54)"}}>
                    <span style={{width: "1em"}} className={`flag-icon flag-icon-${this.getFlagCode(node.frontmatter.lang)}`}></span>
                    {' '}
                    {node.frontmatter.date}
                    {' • '}
                    <span>{node.timeToRead + " min read"}</span>
                  </small>
                  <p dangerouslySetInnerHTML={{ __html: node.frontmatter.spoiler }} />
                </div>
              );
            }
          )}
        </div>
        <Subscribe />
        <hr style={{marginTop: "50px"}} />
        <Footer />
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        siteUrl
        social {
          twitter
        }
        image
      }
    }
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
