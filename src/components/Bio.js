import React from 'react'

// Import typefaces
import 'typeface-montserrat';
import 'typeface-merriweather';

import profilePic from './profile-pic.jpg';
import { rhythm } from '../utils/typography';

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
            borderRadius: "50%"
          }}
        />
        <p>
          Written by <strong>Rafael Quintanilha</strong>, a Brazilian software engineer
          who enjoys writing about tech, politics and whatever comes to his mind.<br />
          <a href="https://twitter.com/rafaquint">
            Twitter
          </a>
          {' - '}
          <a href="https://instagram.com/quintanilharafael">
            Instagram
          </a>
          {' - '}
          <a href="https://github.com/rafaelquintanilha">
            GitHub
          </a>
          {' - '}
          <a href="https://www.linkedin.com/in/rafaelquintanilha/">
            LinkedIn
          </a>
        </p>
      </div>
    )
  }
}
