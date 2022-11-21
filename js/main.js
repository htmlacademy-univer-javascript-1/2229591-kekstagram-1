import {generatePictures} from './data.js';
import {drawPictures} from './render.js';
import './form.js';
const pictures = generatePictures();
drawPictures(pictures);
