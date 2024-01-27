// Eg: white -> White
export function PascalCase(string: string) {
  const pascalCaseString =
    string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  return pascalCaseString;
}
