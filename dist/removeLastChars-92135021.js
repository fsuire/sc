function debounce(func, waitFor) {
  let timeoutId = null;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, waitFor);
  };
}

function removeLastChars(str, numberOfCharsToRemove) {
  return str.substring(0, str.length - numberOfCharsToRemove);
}

export { debounce as d, removeLastChars as r };
