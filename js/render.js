const container = document.querySelector('.pictures');
const picturesFragment = document.createDocumentFragment();
const pictureTemplate = document.querySelector('#picture').content;
const newPictureTemplate = pictureTemplate.querySelector('.picture');
const drawPictures = (pictures) => {
  pictures.forEach((picture) => {
    const item = newPictureTemplate.cloneNode(true);
    item.querySelector('.picture__img').src = picture.url;
    item.querySelector('.picture__likes').textContent = picture.likes;
    item.querySelector('.picture__comments').textContent = picture.comments.length;
    picturesFragment.appendChild(item);
  });
  container.appendChild(picturesFragment);
};
export {drawPictures};
