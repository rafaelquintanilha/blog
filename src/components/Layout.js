import React from 'react'
import { Link } from 'gatsby'
import css from './Layout.module.css';
import LOGO from './logo.svg';

export default class Layout extends React.Component {

  get avatar() {
    return (
      <img
        src={LOGO}
        alt="Rafael Quintanilha"
        style={{
          marginBottom: 0, 
        }}
      />
    );
  }

  get header() {
    return (
      <div className={css.container}>
        <div className={css.title}>
          <Link
            style={{
              textShadow: 'none', 
              backgroundImage: 'none',
            }}
            to={'/'}
          >
            {this.avatar}
          </Link>
        </div>
      </div>
    );
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
