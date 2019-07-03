import React from 'react';
import Layout from '../components/Layout';
import Bio from '../components/Bio';
import Subscribe from '../components/Subscribe';
import { Link } from 'gatsby';
import TwitterButton from '../components/TwitterButton';

export default class About extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <h3>What's this?</h3>
        <p><Link to="/sobre"><b>Disponível em Português.</b></Link></p>
        <p>
          This blog is a dedicated space to the world of technology and web development. Here, I write about technologies that I'm using, apps that I'm developing, bugs that I have (or not) solved, and tricks that are worth sharing.
        </p>
        <p>
          As I create apps for the web since 2012, expect to find a lot about <i>JavaScript, React, Gatsby, UI, UX, accessibility, HTML, CSS</i> and <i>web development</i> in general. I also talk about <i>serverless, NodeJS, puppeteer, web automation, tests</i> and <i>databases</i>. If it goes to the web or is written in JavaScript, it can be here!
        </p>
        <p>
          In 2015 I co-founded <a href="https://elevential.com">Elevential</a>, a consulting IT company. Because of my experience since then, besides the technical content, expect articles about <i>business</i> in general, <i>entrepreneurship</i> and <i>teams</i> and <i>projects management</i>.
        </p>
        <p>
          You will also find posts in English and Portuguese. Due to the bigger reach, posts which are more complete or "advanced" (in the sense of assuming previous knowledge from the reader) will be mostly in English. In Portuguese I will write basic content yet help spread out knowledge about web development for those who don't have a full domain of English.
        </p>
        <p>
          Discussions will go in my <a href="https://twitter.com/webquintanilha">Twitter</a>. Furthermore, I'll regularly post tips and previews of articles under development. Post suggestions? Questions about a specific article? Alternative solutions? Mistakes in the code? Just ping me on <a href="https://twitter.com/webquintanilha">@webquintanilha</a>.
        </p>
        <p>
          All code shared in the articles are in GitHub, including the <a href="https://github.com/rafaelquintanilha/blog">source of this blog</a> (written in Gatsby and hosted on Netlify).
        </p>
        <p>
          Now you know what you are doing here, <Link to="/">go read something more useful</Link>.
        </p>
        <TwitterButton />
        <Subscribe />
        <hr style={{marginTop: "50px"}} />
        <Bio />
      </Layout>
    );
  }
}
