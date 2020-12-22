import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './profile-pic.jpg'
import { rhythm } from '../utils/typography'

export default class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src={profilePic}
          alt={`Rafael Quintanilha`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
            borderRadius: '50%',
          }}
        />
        <p>
          <strong>Rafael Quintanilha</strong> is a Brazilian software engineer
          who enjoys writing about technology, web development, front-end,
          React, data science, and whatever comes to his mind.
          <br />
          <a
            href="https://twitter.com/webquintanilha"
            target="_blank"
            rel="noopener"
          >
            Twitter
          </a>
          {' - '}
          <a
            href="https://github.com/rafaelquintanilha"
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>
          {' - '}
          <a
            href="https://www.linkedin.com/in/rafaelquintanilha/"
            target="_blank"
            rel="noopener"
          >
            LinkedIn
          </a>
          {' - '}
          <a href="https://quantbrasil.com.br/" target="_blank" rel="noopener">
            QuantBrasil
          </a>
        </p>
      </div>
    )
  }
}
