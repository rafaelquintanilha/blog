import React from 'react';
import Calculator from '../../../apps/drunken-sailor/Simulator';
import Helmet from 'react-helmet';

export default class Index extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Helmet
          htmlAttributes={{lang: 'en'}}
          meta={[{name: 'description', content: "Simulate the drunken sailor problem"}]}
          title={"Drunken Sailor Simulator"}
        />
        <Calculator />
      </React.Fragment>
    );
  }
}