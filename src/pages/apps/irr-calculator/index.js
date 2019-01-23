import React from 'react';
import css from './index.module.css';
import { IRR } from './util';
import Helmet from 'react-helmet';
import NumericInput from './NumericInput';
import ModeSelector from './ModeSelector';
import Result from './Result';

const MODE = { AUTO: "AUTO", MANUAL: "MANUAL" };

export default class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      initialAmount: "",
      projectedCash: "",
      growthRate: "",
      period: "",
      IRR: "",
      manualProjectedFlow: [],
      projectionMethod: MODE.AUTO
    };
    this.investmentInput = React.createRef();
  }

  onResetClick(e) {
    e.preventDefault();
    this.setState({
      initialAmount: "",
      projectedCash: "",
      growthRate: "",
      period: "",
      IRR: "",
      manualProjectedFlow: []
    });
    this.investmentInput.current.focus();
  }

  onClick() {
    const futureCashflow = this.isAutoMode ? this.projectedCashFlow : this.state.manualProjectedFlow;
    const cashflow = [(-1) * this.state.initialAmount, ...futureCashflow];
    this.setState({IRR: IRR(cashflow)});
  }

  onPeriodChange(e) {
    const value = parseInt(e.target.value);
    this.setState({period: isNaN(value) ? "" : Math.min(Math.max(1, value), 30)});
  }

  onInputChange(attr, e) {
    const value = parseFloat(e.target.value);
    this.setState({[attr]: isNaN(value) ? "" : value});
  }

  onManualCashChange(i, e) {
    const clone = this.state.manualProjectedFlow.concat([]);
    clone[i] = parseFloat(e.target.value);
    this.setState({manualProjectedFlow: clone});
  }

  isValid(value) {
    return value !== "" && !isNaN(value);
  }

  get projectedCashFlow() {
    return Array(this.state.period).fill(0)
      .map((el, i) => this.state.projectedCash * Math.pow((1 + this.state.growthRate / 100), i));
  }

  get IRR() {
    if ( !this.state.IRR ) return null;
    return <Result IRR={this.state.IRR} onResetClick={this.onResetClick.bind(this)} />;
  }

  get automaticProjection() {
    if ( this.isManualMode ) return null;
    return (
      <React.Fragment>
        <NumericInput 
          label="Projected Base Cash Inflow"
          value={this.state.projectedCash}
          onChange={this.onInputChange.bind(this, "projectedCash")}
          hint="How much you expect will be the base cash flow in the future"
        />
        <NumericInput 
          label="Growth Rate (%/period)"
          hint="Total period of investment. Should be between 1 and 30"
          value={this.state.growthRate}
          onChange={this.onInputChange.bind(this, "growthRate")} 
          hint="How much your base cash flow will grow in each period"
        />
      </React.Fragment>
    );
  }

  get manualProjection() {
    if ( !this.isValid(this.state.period) || this.isAutoMode ) return null;
    return (
      <React.Fragment>
        {Array(this.state.period).fill(0).map((el, i) => (
          <NumericInput
            key={i}
            label={`Cash Flow for Period ${i+1}`}
            value={this.isValid(this.state.manualProjectedFlow[i]) ? this.state.manualProjectedFlow[i] : ""}
            onChange={this.onManualCashChange.bind(this, i)}
          />
        ))}
      </React.Fragment>
    );
  }

  get isManualMode() {
    return this.state.projectionMethod === MODE.MANUAL;
  }

  get isAutoMode() {
    return this.state.projectionMethod === MODE.AUTO;
  }

  get isFormValid() {
    if ( this.isAutoMode ) {
      return this.isValid(this.state.initialAmount)
        && this.isValid(this.state.period)
        && this.isValid(this.state.growthRate)
        && this.isValid(this.state.projectedCash);
    }
    else if ( this.isManualMode ) {
      return this.isValid(this.state.initialAmount)
        && this.isValid(this.state.period)
        && this.state.manualProjectedFlow.length === this.state.period
        && this.state.manualProjectedFlow.reduce((acc, val) => acc && this.isValid(val), true);
    }
  }

  render() {
    return (
      <div className={css['container']}>
        <Helmet
          htmlAttributes={{lang: 'en'}}
          meta={[{name: 'description', content: "Simulate the IRR of your investment"}]}
          title={"IRR Calculator"}
        />
        <header>
          <h1>IRR Calculator</h1>
        </header>
        <main className={css['main']}>
          <NumericInput 
            autoFocus
            min={0}
            label="Initial Investment"
            hint="Money you need to invest upfront"
            value={this.state.initialAmount}
            onChange={this.onInputChange.bind(this, "initialAmount")}
            ref={this.investmentInput}
          />
          <NumericInput 
            min={1}
            label="Period of Time"
            hint="Total period of investment. Should be between 1 and 30"
            value={this.state.period}
            onChange={this.onPeriodChange.bind(this)}  
          />
          <ModeSelector
            autoValue={MODE.AUTO}
            manualValue={MODE.MANUAL}
            isAutoMode={this.isAutoMode}
            isManualMode={this.isManualMode}
            onChange={e => this.setState({projectionMethod: e.target.value})}
          />
          {this.automaticProjection}
          {this.manualProjection}
          <button 
            disabled={!this.isFormValid} 
            onClick={this.onClick.bind(this)}>Calculate</button>
          {this.IRR}
        </main>
        <footer className={css['footer']}>
          Created by <a href="https://rafaelquintanilha.com">Rafael Quintanilha</a>
        </footer>
      </div>
    );
  }
}