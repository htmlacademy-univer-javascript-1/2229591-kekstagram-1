import './form.js';
import {get} from './net.js';
import {renderPictures} from './render.js';
import {errorMessage} from './utils.js';
const onError = () => {
  errorMessage.querySelector('h2').textContent = 'Ошибка загрузки изображений';
  const button = errorMessage.querySelector('button');
  button.textContent='Перезагрузить страницу';
  errorMessage.addEventListener('click',() => location.reload(),{once:true});
  document.querySelector('body').append(errorMessage);
};
const onResult = (photos) => {
  renderPictures(photos);
};

get(onResult,onError);
