import React from 'react'
import profilePic from './avatar.jpeg'
export default class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
        }}
      >
        <img
          src={profilePic}
          alt={`Rafael Quintanilha`}
          style={{
            marginRight: '20px',
            marginBottom: 0,
            width: '60px',
            height: '60px',
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
            href="https://linkedin.com/in/rafaelquintanilha"
            target="_blank"
            rel="noopener"
          >
            LinkedIn
          </a>
          {' - '}
          <a href="https://quantbrasil.com.br" target="_blank" rel="noopener">
            QuantBrasil
          </a>
        </p>
      </div>
    )
  }
}
