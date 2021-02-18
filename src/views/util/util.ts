// Instead of writing to the database everytime we a character, this function makes it possible
// to add a delay so that only update the database wait seconds after the user has typed.
export const debounce = (func: any, wait: any) => {
  let timeout: any;

  return function executedFunction(...args: any) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
