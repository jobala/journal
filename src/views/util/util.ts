// Instead of writing to the database everytime we a character, this function makes it possible
// to add a delay so that only update the database wait seconds after the user has typed.
export function debounce(func: any, wait: any, immediate: any) {
  let timeout: any;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
