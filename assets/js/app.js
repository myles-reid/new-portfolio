'use strict';

import * as utils from './utils.js';

const phrase = utils.select('.phrase');


/*
Rotating Text on the Hero Banner
*/

let swapablePhrase = phrase.textContent;
const rotatingPhrases = [
  'a developer.', 'enthusiastic.', 'Myles Reid.', 'a student.'
];

function textTypingEffect(element, text, i = 0) {
  if (i === 0) element.textContent = '';
  element.textContent += text[i]
  if (i === text.length - 1) return;
  setTimeout(() => textTypingEffect(element, text, i + 1), 75);
}

function changePhrase(i) {
  const newPhrase = rotatingPhrases[i];
  textTypingEffect(phrase, newPhrase); 
}

function rotatePhrase() {
  let i = 0;
  setInterval(() => {
    changePhrase(i);
    i = (i + 1) % rotatingPhrases.length; 
  }, 3000);
}

utils.listen('load', window, () => {
  rotatePhrase()
  textTypingEffect(phrase, swapablePhrase);
});