// Eg: white -> White

export function PascalCase(str: string) {
  const stringArray = str.split(" ");
  const pascalCaseResultantArray = stringArray.map(
    (eachString) =>
      eachString.charAt(0).toUpperCase() + eachString.slice(1).toLowerCase()
  );

  return pascalCaseResultantArray.join(" ");
}
