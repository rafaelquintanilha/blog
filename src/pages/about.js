import React from 'react';
import Layout from '../components/Layout';
import Bio from '../components/Bio';
import { Link } from 'gatsby';

export default class About extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <h3>What's this?</h3>
        <p>
          This blog is an attempt to keep a habit of regularly writing. When I started this project, the posts were technical, complex and huge, which happened to discourage myself to write more often. This time I'll focus on mantaining a more regularly updated space without decreasing quality (if that's even possible).
        </p>
        <p>
          Hence, <b>Magazine</b>. A magazine where I gave myself permission to write, whatever it is, whenever I want. But don't worry my geek friend - I am a Software Engineer, so it is natural that my approaches have this bias.
        </p>
        <p>
          You'll see content in English and Portuguese. English because the reach is far bigger, in addition to helping me practice fluency. Portuguese because there is a lot to say, and it's often unsaid, in my mother tongue. As a rule of thumb, technical content will be in English and generalities in Portuguese.
        </p>
        <p>
          Technically speaking I intend to write about software in general, but specifically about <i>front-end</i>, <i>React</i>, <i>UI/UX</i>, <i>project management</i>, <i>entrepreneurship</i>, etc. Topics I can derive from my experience as web developer since 2012 and entrepreneur since 2015.
        </p>
        <p>
          Generally speaking I'll try to speak about politics (with a vision you are not used to see in a developer), finance, chronicles and whatever I find relevant (although you may disagree and I can certainly regret).
        </p>
        <p>
          This blog was ported from Wordpress to <a href="https://www.gatsbyjs.org/">Gatsby</a> (thank God). The code is available <a href="https://github.com/rafaelquintanilha/blog">here</a>.
        </p>
        <p>
          Now you know what you are doing here, <Link to="/">go read something more useful</Link>.
        </p>
        <p><Link to="/sobre"><b>Disponível em Português.</b></Link></p>
        <hr />
        <Bio />
      </Layout>
    );
  }
}
