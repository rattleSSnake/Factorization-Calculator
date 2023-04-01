import trialDivision from "./algorithms/trial-division.js";
import trialDivisionV2 from "./algorithms/trial-division2.js";
import quadraticSeive from "./algorithms/quadratic-seive.js";

onmessage = ({ data: { number, algorithm } }) => {
  switch (algorithm) {
    case "trial division":
      process(number, trialDivision);
      break;
    case "trial div v2":
      process(number, trialDivisionV2);
      break;
    case "quadratic seive":
      process(number, quadraticSeive);
      break;
    default:
      process(number, trialDivision);
  }
};

const process = (number, algorithm) => {
  try {
    const t0 = performance.now();
    for (const res of algorithm(number)) postMessage({ res: res });
    const t1 = performance.now();
    postMessage({ executionTime: t1 - t0 });
  } catch {
    console.error(
      `${typeof algorithm(
        number
      )} was returned instead of array or bigint generator`
    );
  }
};
