import { useState, useEffect, useRef, StrictMode, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import {
  setToStorage,
  retrieveFromStorage,
  downloadJSON,
  scrollDown,
  findResultsInStorage,
  finalizeFactorization,
  exponentiateCommonFactors,
  isNumeric,
  getPreviousStoredNumbers,
} from "./utils.js";
import * as sc from "./styles";

function App() {
  const [useDarkTheme, setDarkTheme] = useState(
    retrieveFromStorage("configuration")?.useDarkTheme ?? true
  );

  const switchTheme = ({ target: { checked } }) => {
    setDarkTheme(checked);
    setToStorage("configuration", { useDarkTheme: checked });
  };

  return (
    <Theme useDarkTheme={useDarkTheme} handleInput={switchTheme}>
      <sc.globalStyles />
      <sc.title>Factorization Calculator</sc.title>
      <UserInteractions />
    </Theme>
  );
}

function Theme({ useDarkTheme, handleInput, children }) {
  const theme = useCallback(useDarkTheme ? sc.darkTheme : sc.lightTheme, [
    useDarkTheme,
  ]);

  return (
    <ThemeProvider theme={theme}>
      {children}
      <sc.theme>
        ☀️
        <sc.toogleSwitch>
          <sc.toogleTheme
            type="checkbox"
            name="useDarkTheme"
            id="toogle"
            defaultChecked={useDarkTheme}
            onChange={handleInput}
          />
          <sc.themeLabel htmlFor="toogle" />
        </sc.toogleSwitch>
        🌒
      </sc.theme>
    </ThemeProvider>
  );
}

function UserInteractions() {
  const [number, setNumber] = useState("");
  const [config, setConfig] = useState(
    retrieveFromStorage("configuration") ?? {
      mode: "automatic",
      view: "default",
      algorithm: "trial div v2",
      useScientificNotation: false,
      usePreviousResults: true,
    }
  );
  const [prevNumber, setPreviousNumber] = useState("");

  useEffect(() => setToStorage("configuration", config), [config]);

  return (
    <>
      <UserInput setNumber={setNumber} injectPrev={prevNumber} />
      <Configuration setConfig={setConfig} config={config} />
      <PrevNumber setPreviousNumber={setPreviousNumber} current={number} />
      {number && <Factorization number={number} config={config} />}
    </>
  );
}

function PrevNumber({ setPreviousNumber, current }) {
  const [index, setIndex] = useState(0);
  const arrowUp = useRef(null);
  const arrowDown = useRef(null);

  window.onkeydown = event => {
    if (list.length > 0) {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        arrowUp.current.click();
      } else if (event.key === "ArrowDown") arrowDown.current.click();
    }
  };

  const list = useCallback(getPreviousStoredNumbers(), []);

  useEffect(() => {
    current && !list.includes(current) && list.push(current);
  }, [current]);

  const handleUpArrow = () => {
    console.log(list);
    console.log(index);
    if (index === -list.length) setPreviousNumber(list.at(-list.length));
    else {
      setPreviousNumber(list.at(index - 1));
      setIndex(index - 1);
    }
  };

  const handleDownArrow = () => {
    console.log(list);
    console.log(index);
    if (index === -1) setPreviousNumber(list.at(-1));
    else {
      setPreviousNumber(list.at(index + 1));
      setIndex(index + 1);
    }
  };

  return (
    list.length > 0 && (
      <sc.arrowWrapper>
        <sc.arrow ref={arrowUp} onClick={handleUpArrow}>
          ⬆️
        </sc.arrow>
        <sc.arrow ref={arrowDown} onClick={handleDownArrow}>
          ⬇️
        </sc.arrow>
      </sc.arrowWrapper>
    )
  );
}

function Configuration({ config, setConfig }) {
  const [showBT, setShowBT] = useState(false);

  const handleConfig = ({ target: { type, name, value, checked } }) =>
    setConfig(previous => ({
      ...previous,
      [name]: type === "select-one" ? value : checked,
    }));

  return (
    <>
      <sc.options>
        <summary title="set your config">Options:</summary>
        <sc.panelContent>
          <sc.wrapper title="Change factorization display style">
            <label>Mode:</label>
            <sc.select name="mode" value={config.mode} onChange={handleConfig}>
              <option>automatic</option>
              <option>factorization</option>
              <option>primality test</option>
            </sc.select>
          </sc.wrapper>
          <sc.wrapper title="Change factorization display style">
            <label>View:</label>
            <sc.select name="view" value={config.view} onChange={handleConfig}>
              <option>default</option>
              <option>detailed</option>
            </sc.select>
          </sc.wrapper>
          <sc.wrapper title="Choose the algorithm to be used (default is auto)">
            <label>Algorithm:</label>
            <sc.select
              name="algorithm"
              value={config.algorithm}
              onChange={handleConfig}
            >
              <option>trial division</option>
              <option>trial div v2</option>
              <option>quadratic seive</option>
            </sc.select>
          </sc.wrapper>
          <sc.wrapper title="Display numbers in scientific notation">
            <label>Use scientific notation</label>
            <sc.input
              type="checkbox"
              checked={config.useScientificNotation}
              name="useScientificNotation"
              onChange={handleConfig}
            />
          </sc.wrapper>
          <sc.wrapper title="This retrieves previous results from LocalStorage">
            <label>Use previous results</label>
            <sc.input
              type="checkbox"
              checked={config.usePreviousResults}
              name="usePreviousResults"
              onChange={handleConfig}
            />
          </sc.wrapper>
          <sc.wrapper
            title="Perform a benchmarking test on your device"
            onClick={() => setShowBT(!showBT)}
          >
            Benchmarking test
          </sc.wrapper>
          <sc.wrapper
            onClick={downloadJSON}
            title="Download your factorization history & config in a json file"
          >
            Download history & config
          </sc.wrapper>
          <sc.wrapper>
            <sc.link
              href="https://github.com/rattleSSnake/Factorization-Calculator"
              title="For further info and explanations, check the github repo"
            >
              Head to repository
            </sc.link>
          </sc.wrapper>
        </sc.panelContent>
      </sc.options>
      {showBT && <BenchmarkingTest exit={() => setShowBT(false)} />}
    </>
  );
}

function UserInput({ injectPrev, setNumber }) {
  const [input, setInput] = useState("");

  const handleInput = ({ target }) => {
    setInput(target.value);
    target.setCustomValidity("");
  };

  useEffect(() => setInput(injectPrev), [injectPrev]);

  const handleOnInvalid = ({ target }) =>
    target.setCustomValidity("Enter a +integer > 1");

  const handleSubmit = event => {
    event.preventDefault();
    setNumber(input);
    if (window.matchMedia("(max-width: 700px)").matches) scrollDown(100);
  };

  return (
    <>
      <form onSubmit={handleSubmit} onInvalid={handleOnInvalid}>
        <sc.input
          value={input}
          onChange={handleInput}
          placeholder="+integer"
          pattern="^([2-9]|[1-9]+\d+)$"
          autoFocus
          required
        />
        <sc.button type="submit">submit</sc.button>
      </form>
    </>
  );
}

function Factorization({
  number,
  config: { mode, view, algorithm, useScientificNotation, usePreviousResults },
}) {
  const [results, setResults] = useState({});

  useEffect(() => {
    setResults({});
    const resultsFromStorage =
      usePreviousResults && findResultsInStorage(number);
    if (resultsFromStorage)
      setResults({
        ...resultsFromStorage,
        aboutExecution: "Retrieved from localStorage",
      });
    else {
      number = BigInt(number);
      const worker = new Worker(new URL("worker.js", import.meta.url), {
        type: "module",
      });
      worker.postMessage({ number, mode, algorithm });
      let divisors = [];
      worker.onmessage = ({ data: { res, executionTime } }) => {
        if (res) {
          typeof res === "boolean" ? (divisors = res) : divisors.push(res);
          setResults(finalizeFactorization(number, divisors));
        }
        if (isNumeric(executionTime)) {
          setResults(previous => ({
            ...previous,
            aboutExecution: executionTime,
          }));
          setToStorage("history", {
            [number]: {
              algorithm: algorithm,
              ...finalizeFactorization(number, divisors),
              executionTime: executionTime,
              timestamp: Date.now(),
            },
          });
        }
      };
      return () => worker.terminate();
    }
  }, [number, mode, algorithm]);

  return (
    <sc.results>
      <summary>Results:</summary>
      <sc.panelContent>
        <DisplayNumber
          number={number.toString()}
          useScientificNotation={useScientificNotation}
        />
        <DisplayFactorization
          view={view}
          divisors={results.divisors ?? []}
          detailed={results.detailed ?? []}
        />
        <Prime prime={results.prime} />
        <AboutExecution about={results.aboutExecution} />
      </sc.panelContent>
    </sc.results>
  );
}

function DisplayNumber({ number, useScientificNotation }) {
  const toScientificNotation = () => {
    let n = number.charAt(0);
    if (number.replace(/(0+)$/, "").length > 1)
      n += "." + number.replace(/(0+)$/, "").substring(1);
    return (
      <>
        {n} ×10<sup>{number.length - 1}</sup>
      </>
    );
  };

  return (
    <sc.wrapper>
      <b>Number</b>: {useScientificNotation ? toScientificNotation() : number}
    </sc.wrapper>
  );
}

function DisplayFactorization({ view, divisors, detailed }) {
  const defaultView = exponentiateCommonFactors(divisors).map(
    (element, index) => (
      <li key={index}>
        {element[1] > 1 ? (
          <>
            {element[0]}
            <sup>{element[1]}</sup>
          </>
        ) : (
          element[0]
        )}
      </li>
    )
  );

  const advancedView = detailed.map((element, index) => (
    <li key={index}>{element}</li>
  ));

  return (
    !!divisors.length && (
      <sc.wrapper>
        <b>Factorization</b>: {view === "detailed" ? advancedView : defaultView}
      </sc.wrapper>
    )
  );
}

function Prime({ prime }) {
  return (
    typeof prime === "boolean" && (
      <sc.wrapper>
        <b>Prime:</b> {prime.toString()}
      </sc.wrapper>
    )
  );
}

function AboutExecution({ about }) {
  about = isNumeric(about)
    ? about === 0
      ? "Too fast to measure"
      : about + " ms"
    : about || "operating...";

  return (
    <sc.wrapper>
      <b>About</b>: {about}
    </sc.wrapper>
  );
}

function BenchmarkingTest({ exit }) {
  const [clicked, setClicked] = useState(false);
  const [results, setResults] = useState({
    time: null,
    speed: "",
  });

  const performTest = () => {
    setClicked(true);
    const worker = new Worker(new URL("worker.js", import.meta.url), {
      type: "module",
    });
    worker.postMessage({ number: 42343234n, algorithm: "trial division" });
    worker.onmessage = ({ data: { executionTime } }) => {
      setResults({
        time: executionTime,
        speed:
          executionTime < 500
            ? "incredibly fast!"
            : executionTime < 1000
            ? "very fast"
            : executionTime < 2000
            ? "fast"
            : executionTime < 3500
            ? "moderate"
            : executionTime < 5000
            ? "slow"
            : "very slow",
      });
      if (executionTime) worker.terminate();
    };
  };

  if (isNumeric(results.time)) {
    return (
      <sc.btBox>
        <sc.btHeading>Results</sc.btHeading>
        <sc.p>
          Your device computed calculation in{" "}
          <b>{Math.round(results.time) / 1000}s</b>
          <br />
          Your device is <b>{results.speed}</b>
        </sc.p>
        <sc.button onClick={exit}>Go Back</sc.button>
      </sc.btBox>
    );
  } else {
    return (
      <sc.btBox>
        <sc.btHeading>Benchmarking Test</sc.btHeading>
        <sc.p>
          <b>Info:</b> This test will compute a calculation on your device and
          will measure time performance. <br />
          Note that results may change depending on your browser and CPU usage.
          It is recommended to use{" "}
          <sc.link href="https://www.google.com/chrome/">Chrome</sc.link>{" "}
          browser (recent version), close other applications and tabs for better
          results and comparision accuracy.
          <br />
          The test generally lasts three seconds however might be slower or
          faster depending on your hardware capabilities. <br />
        </sc.p>
        <sc.button onClick={performTest} disabled={clicked}>
          {clicked ? "operating..." : "start"}
        </sc.button>
      </sc.btBox>
    );
  }
}

createRoot(document.querySelector("main")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
