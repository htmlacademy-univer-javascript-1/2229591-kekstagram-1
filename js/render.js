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
const NUMBER_OF_RANDOM = 10;
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

const sortDefault = () => {
  changeActiveButton('#filter-default');
  clear();
  drawPictures(savedPictures);
};

const sortRandom = () => {
  changeActiveButton('#filter-random');
  const randomPictures = savedPictures.slice().sort(() => .5 - Math.random()).slice(0,NUMBER_OF_RANDOM);
  clear();
  drawPictures(randomPictures);
};

const sortDiscussed = () => {
  const discussedPictures = savedPictures.slice().sort((a,b) => b.comments.length-a.comments.length);
  changeActiveButton('#filter-discussed');
  clear();
  drawPictures(discussedPictures);
};

const sortListeners = () => {
  filters.classList.remove('img-filters--inactive');
  defaultFilter.addEventListener('click', debounce(sortDefault));
  randomFilter.addEventListener('click', debounce(sortRandom));
  discussedFilter.addEventListener('click', debounce(sortDiscussed));
};

export const renderPictures = (pictures) => {
  savedPictures=pictures;
  drawPictures(pictures);
  sortListeners();
};

