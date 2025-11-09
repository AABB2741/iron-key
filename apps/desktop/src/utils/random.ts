export function random<T>(input: T[]): T {
  return input[Math.floor(Math.random() * input.length)];
}
