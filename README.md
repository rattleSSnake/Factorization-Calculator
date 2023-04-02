# Factorization Calculator
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

*This online calculator computes prime factorization of a positive integer and checks if a number is prime.*
This web-app was written using [React.js](https://reactjs.org) library and performs calculations locally using JavaScript language.

## A Customizable Configuration

The calculator provides a customizable config and advanced features, you can:

- Switch view (from *standard* to *advanced*). Standard view exponentiates common factors, advanced view shows all calculation in detail.

- Use different algorithms: default value is *automatic*, meaning the calculator will pick the most optimized and suitable algorithm for your number.

- Display the number in scientific notation in this form: `a ×10`<sup>`x`</sup>, where `a` is a +float number and `x` is a +integer (default is off).

- Use previous results (default is on). The calculator memorizes all calculations performed on your device and stores them in [localStorage](https://developer.mozilla.org/docs/Web/API/Window/localStorage). By disabling this, the calculator will ignore previous results.

- Perform a benchmarking test. This will compute a calculation on your device and will measure time performance. Please note that results may vary depending on your browser, for this matter we recommend using Chrome (or any browser using [V8 JavaScript engine](https://wikipedia.org/wiki/V8_JavaScript_engine)). The test generally lasts ten seconds, however, might be slower or faster depending on your hardware capabilities.

- Download your factorization history and your configuration on your device. This will retrive all data in localStorage and save it as a json file.


## Algorithms
Despite being exclusively written with JavaScript, which is an interpreted language (thus being slower than compiled languages), the calculator can compute prime factorization very fast. The web app works with [`BigInt`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/BigInt) data type instead of numbers to avoid precision loss beyond 2<sup>53</sup> - 1 ([`MAX_SAFE_INTEGER`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER)). To avoid web page to freeze when doing expensive computations, a web worker is used. The web worker sends the results to the main thread. Also, generators are used in order to stream live results. Here is a list of the algorithms used.

### Trial Division
This is the simplest algorithm used in factorization. It was firstly described by [Fibonacci](https://en.wikipedia.org/wiki/Fibonacci) in 1202. Despite being slow, it works perfectly for small numbers. For more information check [here](https://en.wikipedia.org/wiki/Trial_division).
An improved version is also available which is 2 times more efficient.

### Quadratic seive
The following npm package is used, [quadraticsievefactorization](https://npm.io/package/quadraticsievefactorization)

**If you want to support this project, please contribute! You can add your factorization algorithms and see how fast they are!**
