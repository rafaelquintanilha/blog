import React from 'react'

export default class Result extends React.Component {

  format(num) {
    return parseFloat(Math.round(num * 10000) / 100).toFixed(2) + "%";
  }

  render() {
    return (
      <React.Fragment>
        {isNaN(this.props.IRR)
          ? <div>{this.props.IRR}. Please try again.</div>
          : <div>Projected IRR is <strong>{this.format(this.props.IRR)}</strong></div>
        }
        <a href="#" onClick={this.props.onResetClick}>Reset</a>
      </React.Fragment>
    );
  }
}
