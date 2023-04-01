export default function* trialDivision2(int) {
  let divisor = 2n;
  while (int % divisor === 0n) {
    yield divisor;
    int /= divisor;
  }
  divisor = 3n;
  while (divisor * divisor <= int) {
    if (int % divisor === 0n) {
      yield divisor;
      int /= divisor;
    } else {
      divisor += 2n;
    }
  }
  if (int !== 1n) yield int;
}
