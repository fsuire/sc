export default function kebabCaseToPascalCase(kebabString: string): string {
  return kebabString.split('-').reduce((acc, current) => {
    acc += current.charAt(0).toUpperCase() + current.slice(1)
    return acc
  }, '')
}
