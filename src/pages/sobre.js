import React from 'react';
import Layout from '../components/Layout';
import Bio from '../components/Bio';
import { Link } from 'gatsby';

export default class Sobre extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <h3>Mas o que é isso?</h3>
        <p>
          Este blog é uma tentativa de manter um hábito regular de escrita. Quando comecei esse projeto, os posts eram técnicos, complexos e grandes, o que por vezes acabavam me desestimulando a escrever. Dessa vez focarei em manter um espaço mais atualizado <i>sem</i> deixar cair a qualidade do conteúdo (se é que isso é possível).
        </p>
        <p>
          Daí, <b>Magazine</b>. Uma revista onde me dei permissão para escrever, sejá lá o que for, sempre que me der na telha. Mas calme meu amigo nerd - sou Engenheiro de Software por vocação, então é natural que minha abordagem sempre tenha esse viés.
        </p>
        <p>
          Você verá também conteúdos em inglês e português. Inglês pois o alcance é consideravelmente maior, além de servir como prática de fluência. Português pois há muito a se dizer, e não é dito, na minha língua pátria. Via de regra, conteúdos técnicos serão em inglês, generalidades em português.
        </p>
        <p>
          No aspecto técnico, pretendo escrever sobre software em geral, mas especificamente sobre <i>front-end</i>, <i>React</i>, <i>UI/UX</i>, <i>gerenciamento de projetos</i>, <i>empreendedorismo</i> e etc. Tópicos oriundos de minha experiência como desenvolvedor web desde 2012 e empreendedor desde 2015.
        </p>
        <p>
          Já no aspecto geral, procurarei falar sobre política (sob uma visão que você não está acostumado a ver um desenvolvedor falando), finanças, crônicas e o que mais eu achar que seja relevante externizar (embora você possa discordar e certamente eu possa me arrepender).
        </p>
        <p>
          Este blog foi portado de Wordpress para <a href="https://www.gatsbyjs.org/">Gatsby</a> (graças a Deus). O código está disponível <a href="https://github.com/rafaelquintanilha/blog">aqui</a>.
        </p>
        <p>
          Agora que você já sabe o que está fazendo aqui, <Link to="/">vá ler algo mais útil</Link>.
        </p>
        <p><Link to="/about"><b>Available in English.</b></Link></p>
        <hr />
        <Bio />
      </Layout>
    );
  }
}
