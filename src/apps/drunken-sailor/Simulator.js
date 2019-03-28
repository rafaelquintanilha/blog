import React from 'react';
import css from './Simulator.module.css';
import NumericInput from '../irr-calculator/NumericInput';
import { runSimulations } from './util';

export default class Simulator extends React.Component {

  constructor() {
    super();
    this.state = {
      stepsAwayFromTheEdge: 5,
      probabilityTowardsTheEdge: 0.5,
      numberOfSimulations: 1000,
      percentageOfDeaths: null
    };
    this.investmentInput = React.createRef();
  }

  onInputChange(attr, e) {
    const value = parseFloat(e.target.value);
    this.setState({[attr]: isNaN(value) ? "" : value});
  }

  isValid(value) {
    return value !== "" && !isNaN(value);
  }

  get isFormValid() {
    return this.isValid(this.state.stepsAwayFromTheEdge)
      && this.isValid(this.state.probabilityTowardsTheEdge)
      && this.state.probabilityTowardsTheEdge >= 0
      && this.state.probabilityTowardsTheEdge <= 1
      && this.isValid(this.state.numberOfSimulations)
      && this.state.numberOfSimulations <= 10000
      && this.state.numberOfSimulations > 0;
  }

  onClick() {
    const { percentageOfDeaths } = runSimulations(
      this.state.stepsAwayFromTheEdge,
      this.state.probabilityTowardsTheEdge,
      this.state.numberOfSimulations
    );
    this.setState({percentageOfDeaths});
  }

  render() {
    return (
      <div className={css['container']}>
        <NumericInput 
          min={1}
          label="Steps away from the edge"
          hint="Value for n"
          value={this.state.stepsAwayFromTheEdge}
          onChange={this.onInputChange.bind(this, "stepsAwayFromTheEdge")}
        />
        <NumericInput 
          min={0}
          max={1}
          label="Probability towards the edge"
          hint="Between 0 and 1"
          value={this.state.probabilityTowardsTheEdge}
          onChange={this.onInputChange.bind(this, "probabilityTowardsTheEdge")}
        />
        <NumericInput 
          min={1}
          max={10000}
          label="Number of simulations"
          value={this.state.numberOfSimulations}
          onChange={this.onInputChange.bind(this, "numberOfSimulations")}
          hint="Between 1 and 10000"
        />
        <button 
          disabled={!this.isFormValid} 
          onClick={this.onClick.bind(this)}>
          Simulate
        </button>
        {this.state.percentageOfDeaths !== null && <div>
          The sailor died in <b>{this.state.percentageOfDeaths}%</b> of the simulations.
        </div>}
      </div>
    );
  }
}