const image = document.querySelector('.big-picture');
const close = image.querySelector('.big-picture__cancel');
const commentCounter = image.querySelector('.social__comment-count');
const commentsLoader = image.querySelector('.comments-loader');
const commentsWindow = image.querySelector('.social__comments');

const drawComments = (comments) => {
  comments.forEach((comment) => {
    const p = document.createElement('p');
    p.classList.add('social__text');
    p.textContent = comment.message;
    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = comment.avatar;
    img.alt = comment.name;
    img.width = 35;
    img.height = 35;
    const commentFrame = document.createElement('li');
    commentFrame.classList.add('social__comment');
    commentFrame.appendChild(img);
    commentFrame.appendChild(p);
    commentsWindow.appendChild(commentFrame);
  }
  );
};

export const hide = (element) => {
  element.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

export const show = (element) => {
  document.body.classList.add('modal-open');
  element.classList.remove('hidden');
};

export const drawWindow = (picture) => {
  show(image);
  commentCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  close.addEventListener('click', () => hide(image));
  document.addEventListener('keydown',(evt) => {
    if (evt.key === 'Escape') {
      hide(image);
    }
  });
  image.querySelector('.big-picture__img').querySelector('img').src = picture.url;
  image.querySelector('.likes-count').textContent = picture.likes;
  image.querySelector('.social__caption').textContent = picture.description;
  const comments = picture.comments;
  image.querySelector('.comments-count').textContent = comments.length.toString();
  const oldComments = image.querySelectorAll('.social__comment');
  oldComments.forEach((comment)=>
    comment.remove());
  drawComments(comments);
};

