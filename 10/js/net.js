import {drawPictures} from './render.js';
const error = document.querySelector('#error').content.querySelector('section').cloneNode(true);
const onResult = (photos) => {
  drawPictures(photos);
};

const onError = () => {
  error.querySelector('h2').textContent = 'Ошибка загрузки изображений';
  const button = error.querySelector('button');
  button.textContent='Перезагрузить страницу';
  error.addEventListener('click',() => location.reload(),{once:true});
  document.querySelector('body').append(error);
};

export async function get (success, fail) {
  const response = await fetch('https://26.javascript.pages.academy/kekstagram/data').catch(fail);
  const photos = await response.json();
  success(photos);
}

export async function post(data) {
  const response = await fetch('https://26.javascript.pages.academy/kekstagram',{
    method: 'POST',
    body: data
  }).catch(() => false
  );
  return response.ok;
}

export function load() {
  get(onResult,onError);
}
