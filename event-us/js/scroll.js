(function(global){
  'use strict';

  var header;

  function init() {
    header = document.querySelector('header');
    bind();
  }

  function bind() {
    window.addEventListener('scroll', function() {
      var scrollY = window.scrollY;

      if(scrollY !== 0) {
        header.setAttribute('class', 'active');
      } else {
        header.setAttribute('class', '');
      }
    });
  }
  init();
}(window));