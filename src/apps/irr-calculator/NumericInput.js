import React from 'react'
import css from './NumericInput.module.css';
import { uniqueId } from 'lodash';

export default class NumericInput extends React.Component {

  constructor() {
    super();
    this.id = uniqueId("irr-");
    this.input = React.createRef();
  }

  get hint() {
    if ( !this.props.hint ) return null;
    return <div className={css['hint']}>{this.props.hint}</div>;
  }

  focus() {
    this.input.current.focus();
  }

  render() {
    const { label, value, onChange, hint, ...rest } = this.props;
    return (
      <div>
        <label htmlFor={this.id}>{label}</label>
        <br />
        <input
          className={css['input']}
          ref={this.input}
          id={this.id}
          type="number" 
          value={value}
          onChange={onChange}
          {...rest}
        />
        {this.hint}
      </div>
    );
  }
}
