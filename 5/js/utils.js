
const checkStringSize = (string, max) => string.length <= max;
const randomFromTo = function (from, to) {
  if (to < 0 || from < 0 || to < from) {
    return -1;
  }
  return Math.floor(from + Math.random() * (to + 1 - from));
};
export {checkStringSize,randomFromTo};
