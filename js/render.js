import {drawWindow} from './window.js';
import {debounce} from './utils.js';
const filters = document.querySelector('.img-filters');
const defaultFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');
const container = document.querySelector('.pictures');
const picturesFragment = document.createDocumentFragment();
const pictureTemplate = document.querySelector('#picture').content;
const newPictureTemplate = pictureTemplate.querySelector('.picture');
let savedPictures = null;
const drawPictures = (pictures) => {
  pictures.forEach((picture) => {
    const item = newPictureTemplate.cloneNode(true);
    item.querySelector('.picture__img').src = picture.url;
    item.querySelector('.picture__likes').textContent = picture.likes;
    item.querySelector('.picture__comments').textContent = picture.comments.length;
    item.addEventListener('click', () => {
      drawWindow(picture);
    });
    picturesFragment.appendChild(item);
  });
  container.appendChild(picturesFragment);
  picturesFragment.childNodes.forEach((node) => node.remove());
};

const clear = () => {
  document.querySelectorAll('.picture').forEach((image)=>image.remove());
};

const changeActiveButton = (filter) => {
  const activeButton = document.querySelector('.img-filters__button--active');
  activeButton.classList.remove('img-filters__button--active');
  const currentButton = document.querySelector(filter);
  currentButton.classList.add('img-filters__button--active');
};

const defaultSorting = () => {
  changeActiveButton('#filter-default');
  clear();
  drawPictures(savedPictures);
};

const randomSorting = () => {
  changeActiveButton('#filter-random');
  const randomPictures = savedPictures.slice().sort(() => .5 - Math.random()).slice(0,10);
  clear();
  drawPictures(randomPictures);
};

const discussedSorting = () => {
  const discussedPictures = savedPictures.slice().sort((a,b) => b.comments.length-a.comments.length);
  changeActiveButton('#filter-discussed');
  clear();
  drawPictures(discussedPictures);
};

const sortListeners = () => {
  filters.classList.remove('img-filters--inactive');
  defaultFilter.addEventListener('click', debounce(defaultSorting));
  randomFilter.addEventListener('click', debounce(randomSorting));
  discussedFilter.addEventListener('click', debounce(discussedSorting));
};

export const renderPictures = (pictures) => {
  savedPictures=pictures;
  drawPictures(pictures);
  sortListeners();
};

