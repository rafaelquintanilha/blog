import React from 'react'
import twitter from '../assets/twitter-logo-silhouette.svg';
import instagram from '../assets/instagram.svg';
import github from '../assets/github-logo.svg';
import linkedin from '../assets/linkedin-logo.svg';

export default class Footer extends React.Component {

  get linkStyle() {
    return {
      textDecoration: "none", 
      background: "none", 
      padding: "8px", 
      verticalAlign: "sub"
    };
  }

  render() {
    return (
      <footer style={{display: "flex", justifyContent: "space-between", fontSize: "16px"}}>
        <div>@ <strong>{new Date().getFullYear()}</strong></div>
        <div>
          <a href="https://twitter.com/rafaquint" style={this.linkStyle}>
            <img src={twitter} alt="Twitter" title="Twitter" width={16} style={{marginBottom: 0}} />
          </a>
          <a href="https://instagram.com/quintanilharafael" style={this.linkStyle}>
            <img src={instagram} alt="Instagram" title="Instagram" width={16} style={{marginBottom: 0}} />
          </a>
          <a href="https://github.com/rafaelquintanilha" style={this.linkStyle}>
            <img src={github} alt="GitHub" width={16} title="GitHub" style={{marginBottom: 0}} />
          </a>
          <a href="https://www.linkedin.com/in/rafaelquintanilha/" style={this.linkStyle}>
            <img src={linkedin} alt="LinkedIn" width={16} title="LinkedIn" style={{marginBottom: 0}} />
          </a>
        </div>
      </footer>
    );
  }
}
