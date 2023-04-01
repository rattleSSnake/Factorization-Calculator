export default function* trialDivision(int) {
  let divisor = 2n;
  while (int > 1n) {
    if (int % divisor === 0n) {
      yield divisor;
      int /= divisor;
    } else {
      divisor++;
    }
  }
}
