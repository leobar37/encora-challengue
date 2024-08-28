type Func = (...args: any[]) => any;

export function debounce<F extends Func>(
  func: F,
  wait: number
): (...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null;
  return function debounced(...args: Parameters<F>): void {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, wait);
  };
}
