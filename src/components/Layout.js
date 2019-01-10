import React from 'react'
import { Link } from 'gatsby'
import css from './Layout.module.css';

import profilePic from './profile-pic.jpg'
import { rhythm, scale } from '../utils/typography'

export default class Layout extends React.Component {

  get isHome() {
    const rootPath = `${__PATH_PREFIX__}/`
    return this.props.location.pathname === rootPath;
  }

  get avatar() {
    return (
      <img
        src={profilePic}
        alt="Rafael Quintanilha"
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          width: rhythm(this.isHome ? 2 : 1),
          height: rhythm(this.isHome ? 2 : 1),
          borderRadius: "50%"
        }}
      />
    );
  }

  get menu() {
    return (
      <div className={css.menu}>
        <Link to="/about">What's this?</Link>
      </div>
    );
  }

  get expandedHeader() {
    return (
      <div className={css.container}>
        <div className={css.title}>
          {this.avatar}
          <h1
            style={{
              ...scale(1.25),
              marginBottom: rhythm(1.5),
              marginTop: 0,
            }}
          >
            <Link
              style={{
                boxShadow: 'none',
                textDecoration: 'none',
                color: 'inherit',
              }}
              to={'/'}
            >
              {this.props.title}
            </Link>
          </h1>
          <span>Magazine</span>
        </div>
        {this.menu}
      </div>
    );
  }

  get conciseHeader() {
    return (
      <div className={css.concise}>
        <div className={css.title}>
          {this.avatar}
          <h3
            style={{
              fontFamily: 'Montserrat, sans-serif',
              marginTop: 0,
              marginBottom: rhythm(-1),
            }}
          >
            <Link
              style={{
                boxShadow: 'none',
                textDecoration: 'none',
                color: 'inherit',
              }}
              to={'/'}
            >
              RQ Magazine
            </Link>
          </h3>
        </div>
        {this.menu}
      </div>
    );
  }

  get header() {
    return this.isHome ? this.expandedHeader : this.conciseHeader;
  }

  render() {
    return (
      <div className={css.main}>
        {this.header}
        {this.props.children}
      </div>
    );
  }
}
