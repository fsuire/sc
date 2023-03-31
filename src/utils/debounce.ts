// eslint-disable-next-line @typescript-eslint/ban-types
export default function debounce(func: Function, waitFor: number): Function {
  let timeoutId: NodeJS.Timeout | null = null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      func(...args)
    }, waitFor)
  }
}
