const trimAndLower = (value: string) => value.trim().toLowerCase();

export const containsOrInclueds = (
  testString: string,
  searchString: string
): boolean =>
  trimAndLower(testString).startsWith(trimAndLower(searchString)) ||
  trimAndLower(testString).includes(trimAndLower(searchString));
