export default function removeLastChars(str: string, numberOfCharsToRemove: number): string {
  return str.substring(0, str.length - numberOfCharsToRemove)
}
