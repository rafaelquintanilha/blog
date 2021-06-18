import React from 'react'
import Layout from '../components/Layout'
import Bio from '../components/Bio'
import Subscribe from '../components/Subscribe'
import { Link } from 'gatsby'
import TwitterButton from '../components/TwitterButton'

export default class About extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <h3>What's this?</h3>
        <p>
          <Link to="/sobre">
            <b>Disponível em Português.</b>
          </Link>
        </p>
        <p>
          This blog is a dedicated space to the world of technology and web
          development. Here, I write about technologies that I'm using, apps
          that I'm developing, bugs that I have (or not) solved, and tricks that
          are worth sharing.
        </p>
        <p>
          As I create apps for the web since 2012, expect to find a lot about{' '}
          <i>JavaScript, React, Gatsby, UI, UX, accessibility, HTML, CSS</i> and{' '}
          <i>web development</i> in general. I also talk about{' '}
          <i>serverless, NodeJS, puppeteer, web automation, tests</i> and{' '}
          <i>databases</i>. If it goes to the web or is written in JavaScript,
          it can be here!
        </p>
        <p>
          In 2015 I co-founded <a href="https://elevential.com">Elevential</a>,
          a consulting IT company. Because of my experience since then, besides
          the technical content, expect articles about <i>business</i> in
          general, <i>entrepreneurship</i> and <i>teams</i> and{' '}
          <i>projects management</i>.
        </p>
        <p>
          You will also find posts in English and Portuguese. Due to the bigger
          reach, posts which are more complete or "advanced" (in the sense of
          assuming previous knowledge from the reader) will be mostly in
          English. In Portuguese I will write basic content yet help spread out
          knowledge about web development for those who don't have a full domain
          of English.
        </p>
        <p>
          Discussions will go in my{' '}
          <a href="https://twitter.com/webquintanilha">Twitter</a>. Furthermore,
          I'll regularly post tips and previews of articles under development.
          Post suggestions? Questions about a specific article? Alternative
          solutions? Mistakes in the code? Just ping me on{' '}
          <a href="https://twitter.com/webquintanilha">@webquintanilha</a>.
        </p>
        <p>
          All code shared in the articles are in GitHub, including the{' '}
          <a href="https://github.com/rafaelquintanilha/blog">
            source of this blog
          </a>{' '}
          (written in Gatsby and hosted on Netlify).
        </p>
        <p>
          Now you know what you are doing here,{' '}
          <Link to="/">go read something more useful</Link>.
        </p>
        <h4 id="uses">
          <a href="#uses" aria-label="uses permalink" className="anchor">
            <svg
              aria-hidden="true"
              focusable="false"
              height="16"
              version="1.1"
              viewBox="0 0 16 16"
              width="16"
            >
              <path
                fill-rule="evenodd"
                d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
              />
            </svg>
          </a>
          Uses
        </h4>
        <p>
          In the rare occasion you are wondering what my setup is, here it goes:
        </p>
        <ul>
          <li>
            <b>OS:</b> Ubuntu (can't even navigate my way in Windows anymore).
          </li>
          <li>
            <b>Main Computer:</b>{' '}
            <a href="https://amzn.to/36FqVbo">Dell G7 Series 7588</a>. Very
            fast, but heavy as hell.
          </li>
          <li>
            <b>Auxiliary Computer:</b>{' '}
            <a href="https://amzn.to/35z8TXf">Samsumg Chromebook 3</a>. Very
            slow, but light as a feather.
          </li>
          <li>
            <b>Text Editor:</b> VSCode.
          </li>
          <li>
            <b>Communication:</b> Slack / Zoom.
          </li>
          <li>
            <b>Prototyping:</b> Invision / Figma.
          </li>
          <li>
            <b>Website:</b> Written in Gatsby, hosted in Netlify.
          </li>
        </ul>
        <h4 id="quantbrasil">
          <a
            href="#quantbrasil"
            aria-label="Quantbrasil permalink"
            className="anchor"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              height="16"
              version="1.1"
              viewBox="0 0 16 16"
              width="16"
            >
              <path
                fill-rule="evenodd"
                d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
              />
            </svg>
          </a>
          QuantBrasil
        </h4>
        <p>
          I am also the creator and editor of{' '}
          <a href="https://quantbrasil.com.br/?utm_source=blog&utm_medium=link&utm_campaign=blog">
            QuantBrasil
          </a>
          , a platform for quantitative analysis research. Drop by if you are
          interested on <em>Python</em>, <em>pandas</em> and{' '}
          <em>DataScience</em> in general.
        </p>
        <TwitterButton />
        <Subscribe />
        <hr style={{ marginTop: '50px' }} />
        <Bio />
      </Layout>
    )
  }
}
