const image = document.querySelector('.big-picture');
const close = image.querySelector('.big-picture__cancel');
const commentCounter = image.querySelector('.social__comment-count');
const commentsLoader = image.querySelector('.comments-loader');
const commentsWindow = image.querySelector('.social__comments');

const closePicture = () => {
  image.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

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

const drawWindow = (picture) => {
  image.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  close.addEventListener('click', closePicture);
  document.addEventListener('keydown',(evt) => {
    if (evt.key === 'Escape') {
      closePicture();
    }
  });
  image.querySelector('.big-picture__img').querySelector('img').src = picture.url;
  image.querySelector('.likes-count').textContent = picture.likes;
  image.querySelector('.social__caption').textContent = picture.description;
  const comments = picture.comments;
  image.querySelector('.comments-count').textContent = comments.length.toString();
  const oldComments = image.querySelectorAll('.social__comment');
  oldComments.forEach((comment)=>{
    comment.remove();
  });
  drawComments(comments);
};

export {drawWindow};
