import React from 'react'
import { uniqueId } from 'lodash';

export default class ModeSelector extends React.Component {

  constructor() {
    super();
    this.autoOptionId = uniqueId("irr-auto-");
    this.manualOptionId = uniqueId("irr-manual-");
  }

  render() {
    return (
      <div>
        <label htmlFor="irr-calc-type">Projection Method</label>
        <br />
        <input 
          type="radio" 
          name="irr-calc-type" 
          id={this.autoOptionId}
          value={this.props.autoValue} 
          checked={this.props.isAutoMode} 
          onChange={this.props.onChange} />
        {' '} 
        <label htmlFor={this.autoOptionId}>Automatic</label>
        &nbsp;&nbsp;&nbsp;
        <input 
          type="radio" 
          name="irr-calc-type" 
          id={this.manualOptionId}
          value={this.props.manualValue} 
          checked={this.props.isManualMode} 
          onChange={this.props.onChange} />
        {' '} 
        <label htmlFor={this.manualOptionId}>Manual</label>
      </div>
    );
  }
}
