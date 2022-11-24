const imgPreview = document.querySelector('.img-upload__preview');
const uploadScale = document.querySelector('.img-upload__scale');
const smallScale = uploadScale.querySelector('.scale__control--smaller');
const scale = uploadScale.querySelector('.scale__control--value');
const bigScale = uploadScale.querySelector('.scale__control--bigger');

const setValue = (value) => {
  scale.value=`${value}%`
  imgPreview.style = `transform: scale(${value/100})`;
};

const bigger = () => {
  const str = scale.value;
  let value = parseInt(str.slice(0,str.length-1), 10)
  value+=25;
  if (value>100) {
    value=100;
  }
  setValue(value);
};

const smaller = () => {
  const str = scale.value;
  let value = parseInt(str.slice(0,str.length-1), 10)
  value-=25;
  if (value<25) {
    value=25;
  }
  setValue(value);
};;

export const startZoom = () => {
  bigScale.addEventListener('click', bigger);
  smallScale.addEventListener('click', smaller);
}

export const removeZoom = () => {
  setValue(100);
  bigScale.removeEventListener('click', bigger);
  smallScale.removeEventListener('click', smaller);
}

