const uploadForm = document.querySelector('.img-upload__form');
const imgPreview = uploadForm.querySelector('.img-upload__preview');
const slider = uploadForm.querySelector('.effect-level__slider');
const level = uploadForm.querySelector('.effect-level__value');
const filter = {
  chrome: 'grayscale',
  sepia: 'sepia',
  marvin: 'invert',
  phobos: 'blur',
  heat: 'brightness',
};
const delimiter = {
  chrome: '',
  sepia: '',
  marvin: '%',
  phobos: 'px',
  heat: ''
};

const options = {
  chrome: {
    range: {
      min: 0,
      max: 1
    },
    start: 0,
    step: 0.1
  },
  sepia: {
    range: {
      min: 0,
      max: 1
    },
    start: 0,
    step: 0.1
  },
  marvin: {
    range: {
      min: 0,
      max: 100
    },
    start: 0,
    step: 1
  },
  phobos: {
    range: {
      min: 0,
      max: 3
    },
    start: 0,
    step: 0.1
  },
  heat: {
    range: {
      min: 1,
      max: 3
    },
    start: 1,
    step: 0.1
  }
};

noUiSlider.create(slider, {range: {min: 0, max: 0}, start: 0});

export const clearFilter = () => {
  imgPreview.style.filter = 'none';
  level.value=0;
  slider.classList.add('hidden');
  imgPreview.setAttribute('class', 'img-upload__preview');
  imgPreview.classList.add('effects__preview--none');
};

const selectEffect = (evt) => {
  const evtId = evt.target.id;
  const evtParts = evtId.split('-');
  if (evtParts.length !== 2) {
    return;
  }
  const [type, effect] = evtParts;
  if (type !== 'effect') {
    return;
  }
  if (effect==='none') {
    clearFilter();
  } else {
    imgPreview.setAttribute('class', 'img-upload__preview');
    imgPreview.classList.add(`effects__preview--${effect}`);
    if (slider.classList.contains('hidden')) {
      slider.classList.remove('hidden');
    }
    slider.noUiSlider.updateOptions(options[effect]);
    slider.noUiSlider.on('update', () => {
      const value = slider.noUiSlider.get();
      level.value = value;
      imgPreview.style.filter =`${filter[effect]}(${value}${delimiter[effect]})`;
    });
  }
};

export const startEffects = () => {
  uploadForm.addEventListener('change', selectEffect);
  clearFilter();
};

export const finishEffects = () => {
  uploadForm.removeEventListener('change', selectEffect);
  clearFilter();
};
