// Initials of  a name for image fallback
// Eg: Prasses Khadka-> PK

export function generateImageFallbackInitials(str: string) {
  const strArray = str.split(" ");
  const resultantArray = strArray.map((eachString) => eachString.charAt(0));
  return resultantArray.join("").toUpperCase();
}
