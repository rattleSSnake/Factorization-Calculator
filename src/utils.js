export const setToStorage = (key, object) =>
  localStorage.setItem(
    key,
    JSON.stringify({
      ...retrieveFromStorage(key),
      ...object,
    })
  );

export const retrieveFromStorage = key => JSON.parse(localStorage.getItem(key)); //returns null if key is inexistent

export const findResultsInStorage = number => {
  for (const value of Object.values(retrieveFromStorage("history") ?? {})) {
    const index = value.detailed.findIndex(element =>
      element.startsWith(`${number} ÷`)
    );
    if (index >= 0)
      return {
        divisors: value.divisors.slice(index),
        detailed: value.detailed.slice(index),
        prime: value.detailed.slice(index).length === 1,
      };
  }
};

export const getPreviousStoredNumbers = () =>
  Object.entries(retrieveFromStorage("history") ?? [])
    .sort((a, b) => a.at(-1).timestamp - b.at(-1).timestamp)
    .map(elem => elem[0]);

export const downloadJSON = () =>
  Object.assign(document.createElement("a"), {
    href:
      "data:application/JSON," +
      encodeURIComponent(
        JSON.stringify(
          Object.keys(localStorage).reduce(
            (previous, current) => ({
              ...previous,
              [current]: retrieveFromStorage(current),
            }),
            {}
          ),
          null,
          2
        )
      ),
    download: "factorization-calculator-data",
  }).click();

export const scrollDown = ms =>
  setTimeout(
    () =>
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: "smooth",
      }),
    ms
    //adding some latency (in ms) before scrolling down otherwise might not catch new scollHeight
  );

export const finalizeFactorization = (number, data) => {
  let detailed = [];
  data.reduce(
    (previous, current, index) => {
      detailed.push(`${previous[index]} ÷ ${current}`);
      previous.push(previous[index] / current);
      return previous;
    },
    [number]
  );
  return {
    divisors: data.map(String),
    detailed: detailed,
    prime: detailed.length === 1,
  };
};

export const exponentiateCommonFactors = array =>
  array
    .reduce(
      (previous, current) =>
        current === previous[previous.length - 1][0]
          ? (previous[previous.length - 1][1]++, previous)
          : (previous.push([current, 1]), previous),
      [[]]
    )
    .slice(1);

export const isNumeric = x => typeof x === "number";
