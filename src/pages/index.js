import React from 'react';
import { Link, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../components/Layout';
import { rhythm } from '../utils/typography';
import 'flag-icon-css/css/flag-icon.css';
import Footer from '../components/Footer';

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
        float: "right", 
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
              content: 'https://s2.glbimg.com/n09_BnQ3Hz8DbWKZZ_UbwkJQ7MQ=/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2017/B/i/Uh2Lg3QjaOJOLPJhsASQ/facebook.png',
            },
            {
              name: 'twitter:image',
              content: 'https://s2.glbimg.com/n09_BnQ3Hz8DbWKZZ_UbwkJQ7MQ=/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2017/B/i/Uh2Lg3QjaOJOLPJhsASQ/facebook.png',
            },
          ]}
        />
        {this.filter}
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
          )
        })}
        <hr />
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
