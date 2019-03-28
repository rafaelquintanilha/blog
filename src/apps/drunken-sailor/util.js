const MAX_ITERATIONS = 10000;

const updatePosition = (currentPosition, p) => {
  const randomVariable = Math.random();
  if ( randomVariable < p ) return currentPosition - 1;
  else return currentPosition + 1;
}

const simulation = (initialPosition, p) => {
  let iterations = 0;
  let currentPosition = initialPosition;

  while ( currentPosition > 0 && iterations <= MAX_ITERATIONS ) {
    currentPosition = updatePosition(currentPosition, p);
    iterations++;
  }

  return [currentPosition, iterations];
}

export const runSimulations = (initialPosition = 5, p = 0.5, numberOfSimulations = 1000) => {
  const results = [];
  const numberOfIterations = [];
  for ( let i = 0; i < numberOfSimulations; i++ ) {
    const [finalPosition, totalIterations] = simulation(initialPosition, p);
    results.push(finalPosition);
    numberOfIterations.push(totalIterations);
  }

  const numberOfDeaths = results.filter(result => result === 0).length;
  const percentageOfDeaths = ((numberOfDeaths / numberOfSimulations) * 100).toFixed(2);
  const totalIterations = numberOfIterations.reduce((a,b) => a + b);
  const averageIterations = Math.round((totalIterations / numberOfSimulations) * 100) / 100;

  return {
    numberOfDeaths,
    percentageOfDeaths,
    totalIterations,
    averageIterations
  };
};

const runLindy = (barrier, numberOfSimulations, numberOfIterations) => {
  let numberOfDeaths = 0;
  for ( let i = 0; i < numberOfSimulations; i++ ) {
    const totalIterations = numberOfIterations[i];
    if ( totalIterations >= barrier && results[i] === 0 ) numberOfDeaths++;
  }
  const totalThatOvercomeBarrier = numberOfIterations.filter(i => i >= barrier).length;
  console.log(`A total of ${totalThatOvercomeBarrier} had more than ${barrier} iterations and ${numberOfDeaths} died in the end. ${(100 * (numberOfDeaths/totalThatOvercomeBarrier)).toFixed(2)}% died.`);
}

