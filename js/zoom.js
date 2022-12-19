const imgPreview = document.querySelector('.img-upload__preview');
const uploadScale = document.querySelector('.img-upload__scale');
const smallScale = uploadScale.querySelector('.scale__control--smaller');
const scale = uploadScale.querySelector('.scale__control--value');
const bigScale = uploadScale.querySelector('.scale__control--bigger');
const START_VALUE = 100;
const MIN_VALUE=25;
const STEP = 25;
const setValue = (value) => {
  scale.value=`${value}%`;
  imgPreview.style = `transform: scale(${value/100})`;
};

const bigger = () => {
  const str = scale.value;
  let value = parseInt(str.slice(0,str.length-1), 10);
  value+=STEP;
  if (value>START_VALUE) {
    value=START_VALUE;
  }
  setValue(value);
};

const smaller = () => {
  const str = scale.value;
  let value = parseInt(str.slice(0,str.length-1), 10);
  value-=STEP;
  if (value<MIN_VALUE) {
    value=MIN_VALUE;
  }
  setValue(value);
};

export const startZoom = () => {
  bigScale.addEventListener('click', bigger);
  smallScale.addEventListener('click', smaller);
};

export const removeZoom = () => {
  setValue(START_VALUE);
  bigScale.removeEventListener('click', bigger);
  smallScale.removeEventListener('click', smaller);
};

