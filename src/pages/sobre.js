import React from 'react';
import Layout from '../components/Layout';
import Bio from '../components/Bio';
import { Link } from 'gatsby';

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
        <hr />
        <Bio />
      </Layout>
    );
  }
}
