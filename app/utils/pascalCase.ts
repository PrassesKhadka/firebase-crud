// Eg: white -> White
interface IpascalCase {
  [key: string]: string;
}
export function PascalCase({ string1, string2 = "" }: IpascalCase) {
  const pascalCaseString1 =
    string1.charAt(0).toUpperCase() + string1.slice(1).toLowerCase();
  const pascalCaseString2 =
    string2.charAt(0).toUpperCase() + string2.slice(1).toLowerCase();

  return pascalCaseString1 + " " + pascalCaseString2;
}
