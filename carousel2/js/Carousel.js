(function(global, $, U){
  'use strict';

  if( !$ ) {
    console.warn('Carouse relies on jquery.');
    return;
  }

  if( global.Carousel ) {
    console.warn('Already Carousel is exist');
    return;
  }

  function Carousel(target, new_options) {
    // - selector(string type), DOM객체 추가 
    // - carousel 형태 만들기
    // - 움직이는 기능 추가
    // - options 추가

    var carousel = null;
    var max_page = 0;
    var current_page = 0;
    var move_distance = 0;
    var current_distance = 0;
    var options = {
      // 캐러샐 분할 하기 
      view: 1,
      // controller 제거
      controller: true,
      // item hover할 때 튀어나오는 느낌주기
      hover_effect: false,
      // 이미지 비율
      aspect: {
        x: 4,
        y: 3
      } 
    }
    return (function (target, new_options) {
      /**
       * @func init
       * @description 캐러셀 초기화시키는 함수.
       */
      
      var init = function(target, new_options) {

        var target_obj = null;


        new_options = new_options || options; 

        U.extendOptions(options, new_options);
        
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
          carousel = target_obj;
        } else {
          throw 'ul태그가 아닙니다.';
        }
  
        createCarouselComp();
        setCreatedCarouselCompStyle();
        setCarouselInfo();
        bind();
      }
  
      /**
       * @func createCarouselComp
       * @description 캐러셀에 필요한 component를 생성해주고 추가해주는 함수.
       */
      var createCarouselComp = function() {
  
        /*
          Carousel_wrapper 
            - ul
              - li
            - Controller_wrapper
              - controller * li_count
            - move-btn.prev_btn
            - move-btn.next_btn
        */

        // options
        var use_controller = options.controller;
        var view = options.view;
        var hover_effect = options.hover_effect;
        // target Element
        var ul = carousel.cloneNode(true),
            li = ul.querySelectorAll('li'),
            parent = carousel.parentNode;
  
        // createElement & setAttribute
        var carousel_wrapper = document.createElement('div'),
            prev_btn = document.createElement('button'),
            next_btn = document.createElement('button');
        
        carousel_wrapper.setAttribute('class', 'carousel-wrapper');
        prev_btn.setAttribute('type', 'button');
        prev_btn.setAttribute('class', 'move-btn prev');
        next_btn.setAttribute('type', 'button');
        next_btn.setAttribute('class', 'move-btn next');
        

        console.log('use_controller: ', use_controller);
        if( use_controller ) {

          console.log('create controller!');
          var controller_wrapper = document.createElement('div');
          controller_wrapper.setAttribute('class', 'controller-wrapper');
  
          for(var i = 0, len = (li.length - (view - 1)); i < len; i++) {
            var controller = document.createElement('button');
    
            controller.setAttribute('class', 'controller');
            controller.setAttribute('data-index', i);
    
            controller_wrapper.appendChild(controller);
          }
          
          
        }

        for(var i = 0, len = li.length; i < len; i++) {
          var img = li[i].childNodes;
          var img_clone = img[0].cloneNode(true);
          var carousel_img_wrapper = document.createElement('div');

          if( hover_effect ) {
            carousel_img_wrapper.setAttribute('class', 'carousel-img-wrapper hover-effect');
          } else {
            carousel_img_wrapper.setAttribute('class', 'carousel-img-wrapper');
          }
          carousel_img_wrapper.appendChild(img_clone);

          li[i].replaceChild(carousel_img_wrapper, img[0]);
        }

        // combine Element
        
        carousel_wrapper.appendChild(ul);
        use_controller && carousel_wrapper.appendChild(controller_wrapper);
        carousel_wrapper.appendChild(prev_btn);
        carousel_wrapper.appendChild(next_btn);
  
        // replace Element
        parent.replaceChild(carousel_wrapper, carousel);
  
        // this.carousel redefinition
        carousel = carousel_wrapper;
      }
  
      /**
       * @func setCreatedCarouselCompStyle
       * @description 캐러셀 컴포넌트의 스타일을 설정해주는 함수.
       */
      var setCreatedCarouselCompStyle = function() {
        
        // 1. ul을 부모의 넓이 * li크기만큼 변경
        // 2. li크기를 부모크기만큼 변경
        var view = options.view;

        var parent = carousel.parentNode,
            ul = parent.querySelector('ul'),
            li = parent.querySelectorAll('li');
  
        var parent_width = parseInt(window.getComputedStyle(parent).width);
  
        // 1.
        ul.style.width = (parent_width * li.length) / view + 'px';
        // 2.
        for(var i = 0, len = li.length; i < len; i++) {
          var wrapper_width =  parent_width / view;
          var img_wrapper = li[i].children[0];

          li[i].style.width = wrapper_width + 'px';
          setImageWrapperAspect(img_wrapper, wrapper_width);
        }
            
      }
      /**
       * @func setImageWrapperAspect
       * @description 이미지 wrapper의 비율을 맞춰주는 함수.
       */
      var setImageWrapperAspect = function(img_wrapper, img_wrapper_width) {
        // 1. options의 apsect로 img_wrapper의 높이, 이미지의 비율을 구한다.
        var aspect_x = options.aspect.x,
            aspect_y = options.aspect.y,
            img_wrapper_height = img_wrapper_width / aspect_x * aspect_y,
            img_wrapper_aspect = img_wrapper_height / img_wrapper_width;
        console.log(img_wrapper);
        console.log('img_wrapper_width: ', img_wrapper_width);
        console.log('img_wrapper_height: ', img_wrapper_height);
        img_wrapper.style.height = img_wrapper_height + 'px';

        setImageAspect(img_wrapper, img_wrapper_height, img_wrapper_aspect);
      }
      /**
       * @func setImageAspect
       * @description 이미지의 비율을 맞춰주는 함수.
       */
      var setImageAspect = function(img_wrapper, img_wrapper_height, img_wrapper_aspect) {
        var img = img_wrapper.querySelector('img'),
            img_aspect = img.height / img.width,
            style = {};

            console.log('img: ', img);
            console.log('img_aspect: ', img_aspect);
            console.log('img_wrapper_aspect: ', img_wrapper_aspect);
        if( img_aspect <= img_wrapper_aspect ) {
          var actual_img_width = img_wrapper_height / img_aspect,
              toBe_img_width = img_wrapper_height / img_wrapper_aspect,
              margin_left = -Math.round((actual_img_width - toBe_img_width) / 2);

          console.log('margin_left: ', margin_left);
          style.width = 'auto';
          style.height = '100%';
          style.marginLeft = margin_left + 'px';

        } else {

          style.width = '100%';
          style.height = 'auto';
          style.marginLeft = 0;
        }
        
        // U.extendOptions(img.style, style);
        img.style.width = style.width;
        img.style.height = style.height;
        img.style.marginLeft = style.marginLeft;
      }

      /**
       * @func setCarouselInfo
       * @description 캐러셀에 필요한 정보들을 설정해주는 함수.
       */
      var setCarouselInfo = function() {
  
        // var carousel = carousel;
        
        // console.log(carousel);
        // 1. carousel li가 몇개인지
        var li_count = carousel.querySelectorAll('li').length;
        var view = options.view;

        
        max_page = li_count - (view - 1);
        console.log('max_page: ', max_page);
        // 2. parent_width
        setMoveDistance();
  
      }
      /**
       * @func setMoveDistance
       * @description 캐러셀이 움직일 거리를 설정해주는 함수.
       */
      var setMoveDistance = function() {
        var view = options.view;
        move_distance = parseInt(global.getComputedStyle(carousel).width) / view; 
      }
  
      /**
       * @func bind
       * @description 이벤트 바인딩을 모아준 함수.
       */
      // Event binding
      var bind = function() {
  
        var prev_btn = carousel.querySelector('.move-btn.prev'),
            next_btn = carousel.querySelector('.move-btn.next'),
            controllers = carousel.querySelectorAll('.controller');  
  
        // 1. resize 
        window.addEventListener('resize', resizeBrowser.bind(this));
  
        // 2. prev, next click Event
        prev_btn.addEventListener('click', moveUlElement.bind(this, 'prev'));
        next_btn.addEventListener('click', moveUlElement.bind(this, 'next'));
  
        // 3. controller click Event
        for(var i = 0, len = controllers.length; i < len; i++) {
          controllers[i].addEventListener('click', controllerFn.bind(this, i));
        }
      }
  
      /**
       * @func resizeBrowser
       * @description resize 이벤트가 작동할 때 실행할 함수들의 모음.
       */
      var resizeBrowser = function() {
        // 1. 브라우저가 resize될 때마다 carousel의 스타일을 재정의 해줌. 
        setCreatedCarouselCompStyle();
        // 2. 브라우저가 resize될 때마다 carousel-wrapper의 width값을 재정의 해줌.
        setMoveDistance();
        // 3. 브라우저가 resize될 때마다 ul의 left를 재정의 해줌
        moveFn(move_distance * current_page);
      }
      /**
       * @func controllerFn
       * @description controller click event
       */
      var controllerFn = function(index) {
        current_page = index;
        moveFn(move_distance * index);
      }
      /**
       * @func moveUlElement
       * @description ul을 움직여주는 함수.
       */
      var moveUlElement = function(direction) {
        var _max_page = max_page,
            _current_page = current_page,
            _current_distance = current_distance;
  
        if( direction === 'next' ) {
  
          (_current_page >= (_max_page - 1)) ? _current_page = 0 : _current_page+=1;
  
          
        } else if( direction === 'prev' ) {
          
          (_current_page <= 0 ) ? _current_page = (_max_page - 1): _current_page-=1;
  
        }
  
        _current_distance = move_distance * _current_page;
        
        moveFn(_current_distance);
  
        current_page = _current_page;
        current_distance = _current_distance;
        
      }
      /**
       * @func moveFn
       * @description 실질적으로 ul을 움직이는 함수.
       */
      var moveFn = function(_current_distance) {
        var ul = $(carousel).find('ul');
  
        ul.stop(true, true).animate({ left: -(_current_distance) + 'px' }, 300);
      }
  
  
      init(target, new_options);

    }(target, new_options));

  }
  
  global.Carousel = Carousel;

}( window, window.jQuery, function() {

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
  /**
   * @func extendOptions
   * @description 객체를 합쳐주는 함수.
   * @param current_options 기존 Carousel이 가지고 있는 option 객체
   * @param enw_options 생성자 instance가 생성될 때 받은 option 객체 정보
   */
  var extendOptions = function(current_options, new_options) {

    validationOptions(current_options, new_options);

    for(var prop in new_options) {
      if( new_options.hasOwnProperty(prop) ) {
        current_options[prop] = new_options[prop];
      }
    }

    return current_options;
  }
  /**
   * @func validationOptions
   * @description 새로운 객체의 key가 유효한 key값인지 확인.
   */ 

  var validationOptions = function(current_options, new_options) {
    
    for(var prop in new_options) {
      if( new_options.hasOwnProperty(prop) ) {
        if( current_options[prop] === undefined ) {
          throw  prop + '은 유효하지 않은 option입니다.';
        }
      }
    }
  }

  /**
   * @func compareOptions
   * @description 새로운 객체를 받아 기존 options에 값을 재할당시켜주는 함수.
   */ 
  var compareOptions = function(current_options, new_options) {
    // 1. 유효한 options인지 확인
    //  - 유효하지 않은 옵션이면 throw 
    //  - 유효한 옵션이면 비교시작
    // 2. 비교방법
    //  - JSON.stringify를 사용해서 문자열 비교하는 방법
    //  - 객체를 travelsing해서 값이 있는지 비교하는 방법.

    
  }
  return {
    // validation
    isIdSelector: isIdSelector,
    typeValidation: typeValidation,
    isElementNode: isElementNode,
    isTagName: isTagName,
    // options
    extendOptions: extendOptions
  }
}() ) );