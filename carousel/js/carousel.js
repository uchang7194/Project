(function(global){
  'use strict';

  function Carousel(selector) {
    // if(getClass(el) !== 'carousel') { throw '클래스명이 carousel인 ul 태그를 넣어주세요' }
    if(utllis.getElement(selector) === 'undefined') { throw '해당되는 selector가 없습니다.'}
    this.init();
  }

  Carousel.prototype = {
    init: function(el) {
      
    },
    render: function(el) {
      // ul의 크기(부모넓이) * li의 개수
      var parent =  utills.getParent(el),
          child_els = utills.getElements('li');
          el_width = utills.getStyle(el, 'width');
    }
  }

  global.Carousel = Carousel;

}(window));