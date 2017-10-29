(function(global, U){
  'use strict';

  if( global.Carousel ) {
    console.warn('Already Carousel is exist');
    return;
  }

  function Carousel(target) {
    // - selector(string type), DOM객체 추가 
    // - carousel 형태 만들기
    // - 움직이는 기능 추가
    // - options 추가

    this.carousel = null;
    this.options = {

    }

    this.init = function(target) {
      var target_obj = null;

      if( U.typeValidation(target, 'string') ) {
        // 1. selector 중 id만 받을 수 있도록 #이 맨 앞에 있는지 .이 있고 둘 다 없는지 확인
        if( U.isIdSelector(target) ) {
          target_obj = document.querySelector(target);
        } else {
          throw 'id값을 가진 셀렉터만 사용할 수 있습니다.';
        }

      } else if( U.isElementNode(target) ) {
        // 1.target이 UL인지 확인해야함.
        target_obj = target;
      } 

      if( U.isTagName(target_obj, 'ul') ) {
        this.carousel = target_obj;
      } else {
        throw 'ul태그가 아닙니다.';
      }

      console.log('old carousel: ', this.carousel);
      this.createCarouselComp();
      console.log('new carousel: ', this.carousel);
    }
    
    this.createCarouselComp = function() {

      /*
        Carousel_wrapper 
          - ul
            - li
          - Controller_wrapper
            - controller * li_count
          - prev_btn
          - next_btn
      */

      // target Element
      var ul = this.carousel.cloneNode(true),
          li = ul.querySelectorAll('li'),
          parent = this.carousel.parentNode;

      // createElement & setAttribute
      var carousel_wrapper = document.createElement('div'),
          controller_wrapper = document.createElement('div'),
          prev_btn = document.createElement('button'),
          next_btn = document.createElement('button');

      carousel_wrapper.setAttribute('class', 'carousel-wrapper');
      controller_wrapper.setAttribute('class', 'controller-wrapper');
      prev_btn.setAttribute('type', 'button');
      prev_btn.setAttribute('class', 'move-btn prev');
      next_btn.setAttribute('type', 'button');
      next_btn.setAttribute('class', 'move-btn next');

      for(var i = 0, len = li.length; i < len; i++) {
        var controller = document.createElement('button');

        controller.setAttribute('class', 'controller');
        controller.setAttribute('data-index', i);

        controller_wrapper.appendChild(controller);
      }

      // combine Element
      
      carousel_wrapper.appendChild(ul);
      carousel_wrapper.appendChild(controller_wrapper);
      carousel_wrapper.appendChild(prev_btn);
      carousel_wrapper.appendChild(next_btn);

      // replace Element
      parent.replaceChild(carousel_wrapper, this.carousel);

      // this.carousel redefinition
      this.carousel = carousel_wrapper;
    }



    this.init(target);
  }
  
  global.Carousel = Carousel;

}( window, function() {

  // utils
  // validation
  var isIdSelector = function(selector) {
    return /^#/g.test(selector);
  }
  var typeValidation = function(target, type) {
    type = type.toLowerCase();

    return (typeof target === type);
  }
  var isElementNode = function(target) {
    if( !typeValidation(target, 'object') ) { throw 'object가 아닙니다.' }
    return target.nodeType === 1; 
  }
  var isTagName = function(target, name) {

    name = name.toLowerCase();
    return target.nodeName.toLowerCase() === name;  
  }
  return {
    // validation
    isIdSelector: isIdSelector,
    typeValidation: typeValidation,
    isElementNode: isElementNode,
    isTagName: isTagName
  }
}() ) );