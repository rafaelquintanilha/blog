import React from 'react';
import Layout from '../components/Layout';
import Bio from '../components/Bio';
import Subscribe from '../components/Subscribe';
import { Link } from 'gatsby';
import TwitterButton from '../components/TwitterButton';

export default class Sobre extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <h3>Mas o que é isso?</h3>
        <p><Link to="/about"><b>Available in English.</b></Link></p>
        <p>
          Este blog é um espaço dedicado para o mundo da tecnologia e desenvolvimento web. Aqui, escrevo sobre tecnologias que esteja utilizando, apps que esteja desenvolvendo, bugs que eu tenha (ou não) resolvido, e tricks que valham a pena serem compartilhadas.
        </p>
        <p>
          Uma vez que eu crio apps para a web desde 2012, espere encontrar bastante sobre <i>JavaScript, React, Gatsby, UI, UX, acessibilidade, HTML, CSS</i> e <i>desenvolvimento web</i> em geral. Falarei também sobre <i>serverless, NodeJS, puppeteer, web automation, testes</i> e <i>banco de dados</i>. Se vai pra web ou é escrito em JavaScript, pode estar aqui!
        </p>
        <p>
          Em 2015, fui um dos fundadores da <a href="https://elevential.com">Elevential</a>, uma empresa de consultoria em Tecnologia da Informação. Por causa do conhecimento adquirido na área desde então, além do conteúdo técnico, espere artigos sobre <i>negócios</i> em geral, <i>empreendedorismo</i> e <i>gerenciamento de times e projetos</i>.
        </p>
        <p>
          Você encontrará posts tanto em inglês quanto em português. Pelo alcance maior, posts mais completos e "avançados" (no sentido de pressupor um conhecimento prévio do leitor) serão majoritariamente em inglês. Em português escreverei conteúdos mais básicos mas que ajudem a disseminar conhecimento sobre desenvolvimento web para quem não domine tanto a língua inglesa. 
        </p>
        <p>
          Concentrarei as discussões sobre os posts no meu <a href="https://twitter.com/webquintanilha">Twitter</a>. Além disso, postarei dicas regularmente e prévias de artigos que estejam sendo preparados. Sugestões de post? Dúvida em algum artigo? Soluções alternativas? Erros no código? Vá em <a href="https://twitter.com/webquintanilha">@webquintanilha</a> e me mande uma mensagem.
        </p>
        <p>
          Todos os códigos presentes nos artigos estão no GitHub, inclusive o <a href="https://github.com/rafaelquintanilha/blog">código-fonte deste blog</a> (escrito em Gatsby e servido via Netlify).
        </p>
        <p>
          Agora que você já sabe o que está fazendo aqui, <Link to="/">vá ler algo mais útil</Link>.
        </p>
        <h4 id="uses">
          <a href="#uses" aria-label="uses permalink" className="anchor">
            <svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16">
              <path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path>
            </svg>
          </a>
          Uses
        </h4>
        <p>Se você está se perguntando qual é o meu setup, segue a lista:</p>
        <ul>
          <li><b>OS:</b> Ubuntu (mal consigo usar o Windows atualmente).</li>
          <li><b>Computador Principal:</b> <a href="https://amzn.to/36FqVbo">Dell G7 Series 7588</a>. Muito rápido, mas pesado demais.</li>
          <li><b>Computador Auxiliar:</b> <a href="https://amzn.to/35z8TXf">Samsumg Chromebook 3</a>. Muito devagar, mas leve demais.</li>
          <li><b>Editor de Texto:</b> VSCode.</li>
          <li><b>Comunicação:</b> Slack / Zoom.</li>
          <li><b>Prototipação:</b> Invision / Figma.</li>
          <li><b>Website:</b> Escrito em Gatsby, hospedado na Netlify.</li>
        </ul>
        <TwitterButton />
        <Subscribe />
        <hr style={{marginTop: "50px"}} />
        <Bio />
      </Layout>
    );
  }
}
