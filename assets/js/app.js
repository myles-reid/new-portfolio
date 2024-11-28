'use strict';

import * as utils from './utils.js';

const phrase = utils.select('.phrase');
const projects = utils.selectAll('.project');
const hyper = projects[0];
const uni = projects[1];
const tip = projects[2];



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

/*
Animations on scroll
*/

const scrollOffSet = 200;

const elementInView = (element, offset = 0) => {
  const elementTop = element.getBoundingClientRect().top;

  return (
    elementTop <=
    ((window.innerHeight || document.documentElement.clientHeight) - offset)
  );
};

function addAnimateScrollElement(element, animation){
  if (!element.dataset.animated){
    utils.removeClass(element, 'hidden');
    utils.addClass(element, animation);
    element.dataset.animated = 'true';
  }
}

function removeAnimateScrollElement(element, animation){
  if (element.dataset.animated) {
    utils.removeClass(element, animation);
    utils.addClass(element, 'hidden');
    delete element.dataset.animated;
  }
}


const handleScrollAnimation = (elements, animation, delays) => {
  elements.forEach((element, index) => {
    setTimeout(() => {
      if (elementInView(element, scrollOffSet)) {
        addAnimateScrollElement(element, animation);
      } else {
        removeAnimateScrollElement(element, animation)
      }     
    }, delays[index]);
  });
}


utils.listen('scroll', window, () => {
  const elements = [hyper, uni, tip];
  const delays = [0, 500, 1000];
  handleScrollAnimation(elements, 'slide-in-fwd-tl', delays);
})