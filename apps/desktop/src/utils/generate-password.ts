import { random } from "./random";

const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

interface GeneratedPasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

type GeneratorFn = () => string;

const generator = {
  lowercase: () => random(letters.split("")),
  uppercase: () => random(letters.split("")).toUpperCase(),
  numbers: () => random(numbers.split("")),
  symbols: () => random(symbols.split("")),
} satisfies Record<string, GeneratorFn>;

export function generatePassword({
  length,
  lowercase,
  numbers,
  symbols,
  uppercase,
}: GeneratedPasswordOptions) {
  let res = "";

  const generators: GeneratorFn[] = [];

  if (lowercase) {
    generators.push(generator.lowercase);
  }

  if (uppercase) {
    generators.push(generator.uppercase);
  }

  if (numbers) {
    generators.push(generator.numbers);
  }

  if (symbols) {
    generators.push(generator.symbols);
  }

  if (generators.length === 0) {
    throw new Error("Ao menos um tipo de caractere deve ser selecionado.");
  }

  for (let i = 0; i < length; i++) {
    res += random(generators)();
  }

  return res;
}
