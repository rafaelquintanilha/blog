import React from 'react';
import Calculator from '../../../apps/irr-calculator/Calculator';
import Helmet from 'react-helmet';

export default class Index extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Helmet
          htmlAttributes={{lang: 'en'}}
          meta={[{name: 'description', content: "Simulate the IRR of your investment"}]}
          title={"IRR Calculator"}
        />
        <Calculator />
      </React.Fragment>
    );
  }
}