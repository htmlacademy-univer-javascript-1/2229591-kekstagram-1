import {randomFromTo} from './utils.js';
const MAX_COMMENTS = 10; //максимальное число генерируемых комментариев
const uniqueRandom = (border, size) => {
  if (size > MAX_COMMENTS) {
    throw new Error(`Вы пытаетесь сгененрировать ${size} комментариев, а разрешено генерировать ${MAX_COMMENTS} комментариев`);
  }
  const values = Array.from(new Array(MAX_COMMENTS), (x, i) => i + border * MAX_COMMENTS);
  return Array.from(new Array(size), (_, i) => {
    const selection = randomFromTo(0, MAX_COMMENTS - i - 1);
    const selected = values[selection];
    [values[selection], values[MAX_COMMENTS - i - 1]] = [values[MAX_COMMENTS - i - 1], values[selection]];
    return selected;
  }
  );
};
const generateComments = (id, number) => {
  if (number > MAX_COMMENTS) {
    throw new Error(`Вы пытаетесь сгененрировать ${number} комментариев, а разрешено генерировать ${MAX_COMMENTS} комментариев`);
  }
  const commentsArray = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
    ''];
  const namesArray = ['Yakui', 'Ozoi', 'Hidoi', 'Itai', 'Kaitai', 'Nakai', 'Yowai', 'Yabai', 'Morai', 'Chikoi'];
  const idsArray = uniqueRandom(id, number);
  return Array.from(new Array(number), (_, i) => ({
    id: idsArray[i],
    avatar: `img/avatar-${randomFromTo(1, 6)}.svg`,
    message: `${commentsArray[randomFromTo(0, 5)]} ${commentsArray[randomFromTo(0, 6)]}`.trimEnd(),
    name: namesArray[randomFromTo(0, 9)]
  })
  );
};


async function generatePictures() {
  Array.from(new Array(25), (_, i) => ({
    id: i + 1,
    url: `photos/${i + 1}.jpg`,
    description: 'Just another photo',
    likes: randomFromTo(15, 200),
    comments: generateComments(i + 1, randomFromTo(1, MAX_COMMENTS))
  })
  );
}

export {generatePictures};
