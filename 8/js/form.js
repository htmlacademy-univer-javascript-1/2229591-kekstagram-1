import {show, hide} from './window.js';
import {checkStringSize} from './utils.js';
const uploader = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const cancel = document.querySelector('#upload-cancel');
const form = document.querySelector('.img-upload__form');
const comment = form.querySelector('.text__description');
const hashtag = form.querySelector('.text__hashtags');
const submit = form.querySelector('.img-upload__submit');
const LENGTH_LIMIT = 140;
const commentsRegex = /^#[а-яa-zё0-9]{1,19}$/;
const emptyRegex = /^\s*$/;
let commentsCorrect = true;
let tagsCorrect = true;
const close = () => {
  uploader.value = '';
  hide(overlay);
};

uploader.addEventListener('change', () => {
  show(overlay);
  cancel.addEventListener('click', close);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      close();
    }
  });
});

hashtag.onfocus = () => {
  hashtag.addEventListener('keydown',  (evt) => evt.stopPropagation());
};
hashtag.onblur = () => {
  hashtag.removeEventListener('keydown', (evt) => evt.stopPropagation());
};

comment.onfocus = () => {
  comment.addEventListener('keydown', (evt) => evt.stopPropagation());
};
comment.onblur = () => {
  comment.removeEventListener('keydown', (evt) => evt.stopPropagation());
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
  }
  else {
    hideButton();
  }
};
const checkHashtag = (text) => {
  if (emptyRegex.test(text)) {
    tagsCorrect=true;
    validate();
    return true;
  }
  const hashtags = text.split(/ +/).map((tag)=>tag.toLowerCase());
  let valid = hashtags.length<=5;
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


form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
