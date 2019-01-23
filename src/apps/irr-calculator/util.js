export const NPV = (cashflow, discountRate) => 
  cashflow.reduce((acc, val, i) => acc + val / Math.pow((1 + discountRate), i), 0);

export const IRR = (cashflow, initialGuess = 0.1) => {
  const maxTries = 10000;
  const delta = 0.001;
  let guess = initialGuess;
  const multiplier = NPV(cashflow, guess) > 0 ? 1 : -1;
  let i = 0;
  while ( i < maxTries ) {
    const guessedNPV = NPV(cashflow, guess);
    if ( multiplier * guessedNPV > delta ) {
      guess += (multiplier * delta);
      i += 1;
    }
    else break;
  }
  return i === 10000 ? "IRR has diverged" : guess;
}