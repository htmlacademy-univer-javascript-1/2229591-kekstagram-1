
export const checkStringSize = (string, max) => string.length <= max;
export function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export const errorMessage = document.querySelector('#error').content.querySelector('section').cloneNode(true);
export const successMessage = document.querySelector('#success').content.querySelector('section').cloneNode(true);

