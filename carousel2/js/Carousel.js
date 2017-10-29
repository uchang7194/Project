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
    this.max_page = 0;
    this.current_page = 0;
    this.move_distance = 0;
    this.current_distance = 0;
    this.options = {

    }
    /**
     * @func init
     * @description 캐러셀 초기화시키는 함수.
     */
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

      this.createCarouselComp();
      this.setCreatedCarouselCompStyle();
      this.setCarouselInfo();
      this.bind();
    }

    /**
     * @func createCarouselComp
     * @description 캐러셀에 필요한 component를 생성해주고 추가해주는 함수.
     */
    this.createCarouselComp = function() {

      /*
        Carousel_wrapper 
          - ul
            - li
          - Controller_wrapper
            - controller * li_count
          - move-btn.prev_btn
          - move-btn.next_btn
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

    /**
     * @func setCreatedCarouselCompStyle
     * @description 캐러셀 컴포넌트의 스타일을 설정해주는 함수.
     */
    this.setCreatedCarouselCompStyle = function() {
      
      // 1. ul을 부모의 넓이 * li크기만큼 변경
      // 2. li크기를 부모크기만큼 변경

      var parent = this.carousel.parentNode,
          ul = parent.querySelector('ul'),
          li = parent.querySelectorAll('li');

      var parent_width = parseInt(window.getComputedStyle(parent).width);

      // 1.
      ul.style.width = (parent_width * li.length) + 'px';
      // 2.
      for(var i = 0, len = li.length; i < len; i++) {
        li[i].style.width = parent_width + 'px';
      }
          
    }

    /**
     * @func setCarouselInfo
     * @description 캐러셀에 필요한 정보들을 설정해주는 함수.
     */
    this.setCarouselInfo = function() {

      var carousel = this.carousel;

      // 1. carousel li가 몇개인지
      this.max_page = carousel.querySelectorAll('li').length;
      // 2. parent_width
      this.setMoveDistance();

    }
    /**
     * @func setMoveDistance
     * @description 캐러셀이 움직일 거리를 설정해주는 함수.
     */
    this.setMoveDistance = function() {
      this.move_distance = parseInt(global.getComputedStyle(this.carousel).width); 
    }

    /**
     * @func bind
     * @description 이벤트 바인딩을 모아준 함수.
     */
    // Event binding
    this.bind = function() {

      var carousel = this.carousel,
          prev_btn = carousel.querySelector('.move-btn.prev'),
          next_btn = carousel.querySelector('.move-btn.next'),
          controllers = carousel.querySelectorAll('.controller');  

      // 1. resize 
      window.addEventListener('resize', this.resizeBrowser.bind(this));

      // 2. prev, next click Event
      prev_btn.addEventListener('click', this.moveUlElement.bind(this, 'prev'));
      next_btn.addEventListener('click', this.moveUlElement.bind(this, 'next'));

      // 3. controller click Event
      for(var i = 0, len = controllers.length; i < len; i++) {
        controllers[i].addEventListener('click', this.controllerFn.bind(this, i));
      }
    }

    /**
     * @func resizeBrowser
     * @description resize 이벤트가 작동할 때 실행할 함수들의 모음.
     */
    this.resizeBrowser = function() {
      // 1. 브라우저가 resize될 때마다 carousel의 스타일을 재정의 해줌. 
      this.setCreatedCarouselCompStyle();
      // 2. 브라우저가 resize될 때마다 carousel-wrapper의 width값을 재정의 해줌.
      this.setMoveDistance();
      // 3. 브라우저가 resize될 때마다 ul의 left를 재정의 해줌
      this.moveFn(this.move_distance * this.current_page);
    }
    /**
     * @func controllerFn
     * @description controller click event
     */
    this.controllerFn = function(index) {
      console.log(index);
      this.moveFn(this.move_distance * index);
    }
    /**
     * @func moveUlElement
     * @description ul을 움직여주는 함수.
     */
    this.moveUlElement = function(direction) {
      var max_page = this.max_page,
          current_page = this.current_page,
          current_distance = this.current_distance;

      if( direction === 'next' ) {

        (current_page >= (max_page - 1)) ? current_page = 0 : current_page+=1;

        
      } else if( direction === 'prev' ) {
        
        (current_page <= 0 ) ? current_page = (max_page - 1): current_page-=1;

      }

      current_distance = this.move_distance * current_page;
      
      this.moveFn(current_distance);

      this.current_page = current_page;
      this.current_distance = current_distance;
      
    }
    /**
     * @func moveFn
     * @description 실질적으로 ul을 움직이는 함수.
     */
    this.moveFn = function(current_distance) {
      var ul = this.carousel.querySelector('ul');

      ul.style.left = -(current_distance) + 'px';
    }


    this.init(target);
  }
  
  global.Carousel = Carousel;

}( window, function() {

  // utils
  // validation
  /**
   * @func isIdSelector
   * @description selector가 id selector인지 확인하는 함수.
   */
  var isIdSelector = function(selector) {
    return /^#/g.test(selector);
  }
  /**
   * @func typeValidation
   * @description target의 type을 확인하는 함수.
   */
  var typeValidation = function(target, type) {
    type = type.toLowerCase();

    return (typeof target === type);
  }
  /**
   * @func isElementNode
   * @description ElementNode인지 확인하는 함수.
   */
  var isElementNode = function(target) {
    if( !typeValidation(target, 'object') ) { throw 'object가 아닙니다.' }
    return target.nodeType === 1; 
  }
  /**
   * @func isTagName
   * @description 어떤 태그인지 확인하는 함수.
   */
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