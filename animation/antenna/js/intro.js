(function(global){
  'use strict';
  
  const INTRO_IMGS_SRC = [
    './assets/intro01.png',
    './assets/intro02.png',
    './assets/intro03.png',
    './assets/intro04.png',
    './assets/intro05.png',
    './assets/intro06.png',
    './assets/intro07.png',
    './assets/intro08.png',
    './assets/intro09.png',
    './assets/intro10.png'
  ];
  
  var root, image;
  var interval, img_count = 0;

  function init() {
    root = document.querySelector('.intro');
    image = root.querySelector('img');
    interval = setInterval(changeImage, 100);
  }

  function changeImage() {
    image.setAttribute('src', INTRO_IMGS_SRC[img_count++]);
    image.setAttribute('alt', 'intro' + img_count);

    if (img_count >= INTRO_IMGS_SRC.length) {
      clearInterval(interval);
      root.setAttribute('class', 'intro invisible');
      setTimeout(function() {
        root.style.display = 'none';
      }, 800);
    } 
  }

  init();
}(window));