import {show, hide} from './window.js';
import {checkStringSize} from './utils.js';
import {startEffects, finishEffects} from './effects.js';
import {startZoom, removeZoom} from './zoom.js';
import {post} from './net.js';
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const uploader = document.querySelector('#upload-file');
const body = document.querySelector('body');
const overlay = document.querySelector('.img-upload__overlay');
const cancel = document.querySelector('#upload-cancel');
const form = document.querySelector('.img-upload__form');
const comment = form.querySelector('.text__description');
const hashtag = form.querySelector('.text__hashtags');
const submit = form.querySelector('.img-upload__submit');
const success = document.querySelector('#success').content.querySelector('section');
const error = document.querySelector('#error').content.querySelector('section');
const preview = document.querySelector('.img-upload__preview').querySelector('img');
const effectsPreviews = document.querySelectorAll('.effects__preview');
const LENGTH_LIMIT = 140;
const commentsRegex = /^#[а-яa-zё0-9]{1,19}$/;
const emptyRegex = /^\s*$/;
let commentsCorrect = true;
let tagsCorrect = true;
const close = () => {
  uploader.value = '';
  finishEffects();
  hide(overlay);
  removeZoom();
};

const escClosing = (evt) => {
  if (evt.key === 'Escape') {
    close();
  }
};

uploader.addEventListener('change', () => {
  const file = uploader.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) =>
    fileName.endsWith(it)
  );
  if (matches) {
    const url = URL.createObjectURL(file);
    preview.src=url;
    effectsPreviews.forEach((effectPreview)=>{effectPreview.style.backgroundImage=`url(${url})`;});
  }
  show(overlay);
  startEffects();
  startZoom();
  cancel.addEventListener('click', close, {once: true});
  document.addEventListener('keydown', escClosing, {once: true});
});

const stopPropagate = (evt) => evt.stopPropagation();

hashtag.onfocus = () => {
  hashtag.addEventListener('keydown', stopPropagate);
};
hashtag.onblur = () => {
  hashtag.removeEventListener('keydown', stopPropagate);
};

comment.onfocus = () => {
  comment.addEventListener('keydown', stopPropagate);
};
comment.onblur = () => {
  comment.removeEventListener('keydown', stopPropagate);
};

const pristine = new Pristine(form, {
  classTo: 'text',
  errorClass: 'text--error',
  successClass: 'text-success',
  errorTextParent: 'text',
  errorTextTag: 'div',
  errorTextClass: 'text__error'
}, true);

const showButton = () => submit.classList.remove('hidden');

const hideButton = () => submit.classList.add('hidden');

const validate = () => {
  if (commentsCorrect && tagsCorrect) {
    showButton();
  } else {
    hideButton();
  }
};
const checkHashtag = (text) => {
  if (emptyRegex.test(text)) {
    tagsCorrect = true;
    validate();
    return true;
  }
  const hashtags = text.split(/ +/).map((tag) => tag.toLowerCase());
  let valid = hashtags.length <= 5;
  if (valid) {
    valid = hashtags.every((tag) => commentsRegex.test(tag));
  }
  if (valid) {
    valid = !hashtags.some((tag, index) => hashtags.indexOf(tag) !== index);
  }
  tagsCorrect = valid;
  validate();
  return valid;
};

pristine.addValidator(
  hashtag,
  checkHashtag,
  'Введены некорректные хештеги'
);


const checkString = (text) => {
  const valid = checkStringSize(text, LENGTH_LIMIT);
  commentsCorrect = valid;
  validate();
  return valid;
};

pristine.addValidator(
  comment,
  checkString,
  `Комментарий > ${LENGTH_LIMIT} символов`
);

const closeMessage = (msg) => {
  body.removeChild(msg);
  document.addEventListener('keydown', escClosing, {once: true});
};


const restoreData = (button) => {
  if (button.classList.contains('error__button')) {
    overlay.classList.remove('hidden');
  }
};

const setMessageListeners = (window) => {
  const btn = window.querySelector('button');
  const esc = (evt) => {
    if (evt.key === 'Escape') {
      closeMessage(window);
      restoreData(btn);
    }
    document.removeEventListener('keydown', esc);
  };
  window.addEventListener('click', (evt) => {
    if (evt.target.tagName === 'SECTION' || evt.target.tagName === 'BUTTON') {
      closeMessage(window);
      restoreData(btn);
    }
    document.removeEventListener('keydown', esc);
  });
  document.addEventListener('keydown', esc, {once: true});
};


const message = (template) => {
  const window = template.cloneNode(true);
  body.appendChild(window);
  setMessageListeners(window);
};

async function posting(data) {
  const result = await post(data);
  document.removeEventListener('keydown', escClosing);
  if (result) {
    close();
    message(success);
  } else {
    overlay.classList.add('hidden');
    message(error);
  }
}

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const valid = pristine.validate();
  if (valid) {
    posting(new FormData(evt.target));
  }
});
