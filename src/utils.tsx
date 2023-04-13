export function isALetter(char: string): boolean {
  const regex = /^[A-Za-z]+$/
  return char.length === 1 && regex.test(char);
}