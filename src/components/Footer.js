import React from 'react'
import Twitter from '../assets/twitter-logo-silhouette.svg'
import GitHub from '../assets/github-logo.svg'
import LinkedIn from '../assets/linkedin-logo.svg'
import QuantBrasil from '../assets/quantbrasil-logo.svg'
import css from './Footer.module.css'

export default class Footer extends React.Component {
  render() {
    return (
      <footer className={css['footer']}>
        <div>
          @ <strong>{new Date().getFullYear()}</strong>
        </div>
        <div className={css['container']}>
          <a href="https://twitter.com/webquintanilha" title="Twitter">
            <Twitter />
          </a>
          <a href="https://github.com/rafaelquintanilha" title="GitHub">
            <GitHub />
          </a>
          <a
            href="https://www.linkedin.com/in/rafaelquintanilha/"
            title="LinkedIn"
          >
            <LinkedIn />
          </a>
          <a
            href="https://quantbrasil.com.br/?utm_source=blog&utm_medium=link&utm_campaign=blog"
            title="QuantBrasil"
          >
            <QuantBrasil />
          </a>
        </div>
      </footer>
    )
  }
}
