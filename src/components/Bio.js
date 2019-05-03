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
          Written by <strong>Rafael Quintanilha</strong>, a politically incorrect contrarian who writes what comes to his
          mind with words, mathematics and code.<br />
          <a href="https://twitter.com/rafaquint">
            Twitter
          </a>
          {' - '}
          <a href="https://instagram.com/quintanilharafael">
            Instagram
          </a>
        </p>
      </div>
    )
  }
}
