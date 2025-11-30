export function merge<T>(
  arr1: T[],
  arr2: T[],
  compareFn: (a: T, b: T) => boolean,
): T[] {
  const merged = [...arr2];

  for (const item1 of arr1) {
    const exists = merged.some((item1) => compareFn(item1, item1));
    if (!exists) {
      merged.push(item1);
    }
  }

  return merged;
}
