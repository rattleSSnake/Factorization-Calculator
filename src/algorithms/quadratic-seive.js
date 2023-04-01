import QuadraticSeive from "quadraticsievefactorization/QuadraticSieveFactorization";
import isPrime from "quadraticsievefactorization/isPrime";

export default function* quadraticSeive(int) {
  while (int !== 1n) {
    const f = BigInt(isPrime(int) ? int : QuadraticSeive(int));
    yield f;
    int /= f;
  }
}
