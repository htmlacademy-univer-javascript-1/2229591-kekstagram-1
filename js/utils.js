
export const checkStringSize = (string, max) => string.length <= max;
export const randomFromTo = function (from, to) {
  if (to < 0 || from < 0 || to < from) {
    return -1;
  }
  return Math.floor(from + Math.random() * (to + 1 - from));
};

export function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
