const image = document.querySelector('.big-picture');
const close = image.querySelector('.big-picture__cancel');
const commentCounter = image.querySelector('.comments-loaded');
const commentsLoader = image.querySelector('.comments-loader');
const commentsWindow = image.querySelector('.social__comments');
const COMMENT_WIDTH = 35;
const COMMENT_HEIGHT = 35;
const COMMENTS_NUMBER = 5;
let comments;
let loaded = 0;
const drawComment = (comment) => {
  const p = document.createElement('p');
  p.classList.add('social__text');
  p.textContent = comment.message;
  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = comment.avatar;
  img.alt = comment.name;
  img.width = COMMENT_WIDTH;
  img.height = COMMENT_HEIGHT;
  const commentFrame = document.createElement('li');
  commentFrame.classList.add('social__comment');
  commentFrame.appendChild(img);
  commentFrame.appendChild(p);
  commentsWindow.appendChild(commentFrame);
};
const drawComments = () => {
  if (comments.length-loaded<=COMMENTS_NUMBER) {
    const commentsCopy = comments.slice(loaded, comments.length);
    commentsCopy.forEach((comment) => drawComment(comment));
    commentsLoader.classList.add('hidden');
    loaded=comments.length;
  } else {
    const commentsCopy = comments.slice(loaded, loaded+COMMENTS_NUMBER);
    commentsCopy.forEach((comment) => drawComment(comment));
    loaded += COMMENTS_NUMBER;
  }
  commentCounter.textContent = loaded;
};

export const hide = (element) => {
  element.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

export const show = (element) => {
  document.body.classList.add('modal-open');
  element.classList.remove('hidden');
};


const exit = () => {
  hide(image);
  commentsLoader.removeEventListener('click',drawComments);
  close.removeEventListener('click', exit);
};

const escExit = (evt) => {
  if (evt.key === 'Escape') {
    exit();
  }
};

export const drawWindow = (picture) => {
  loaded=0;
  show(image);
  close.addEventListener('click', exit);
  document.addEventListener('keydown',escExit);
  image.querySelector('.big-picture__img').querySelector('img').src = picture.url;
  image.querySelector('.likes-count').textContent = picture.likes;
  image.querySelector('.social__caption').textContent = picture.description;
  comments = picture.comments;
  image.querySelector('.comments-count').textContent = comments.length;
  const oldComments = image.querySelectorAll('.social__comment');
  commentsLoader.classList.remove('hidden');
  oldComments.forEach((comment)=>
    comment.remove());
  drawComments();
  commentsLoader.addEventListener('click',drawComments);
};

