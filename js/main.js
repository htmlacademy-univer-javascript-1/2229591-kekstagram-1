const randomFromTo = function (from, to) {
  if (to < 0 || from < 0 || to < from) {
    return -1;
  }
  return Math.floor(from + Math.random() * (to + 1 - from));
};
randomFromTo(-1,0);

const checkStringSize = (string, max) => string.length <= max;
checkStringSize('random',6);
