(function(global){
  'use strict';

  if( !!global.Utils ) {
    throw 'Already utils object is exist';
  }

  global.Utils = function() {

    /**
     * @method typeValidation
     * @description 데이터의 타입을 판별하는 함수
     * @param target type all
     * @param type string
     */
    // validation
    var typeValidation = function(target, type) {
      type = type.toLowerCase();
      return (typeof target === type)
    }
    /**
     * @method isElement
     * @description element 요소인지 판별하는 함수
     * @param el element
     */
    var isElement = function(el) {
      
      if( typeValidation(el, 'object') ) {
        throw el + 'is not Object';
      }
      return (el.nodeType === 1)
    }

    /**
     * @method extendsOption
     * @description 기존 options에 새로운 option의 값을 합치는 함수.
     * @param old_options 기존 options
     * @param new_options 새로운 options
     */
    var extendsOption = function(old_options, new_options) {

      var prop = null;

      for( prop in new_options ) {

        if( old_options.hasOwnProperty(prop) ) {
          old_options[prop] = new_options[prop];
        }
      }
    }
    /**
     * @method getComputedStyle
     * @description element의 스타일 객체를 반환하는 함수.
     * @param element element 객체
     */ 
    var getComputedStyle = function(element) {

      return global.getComputedStyle(element);
    }

    return {
      // VALIDATION
      typeValidation: typeValidation,
      isElement: isElement,
      // EXTENDS
      extendsOption: extendsOption,
      // GET
      getComputedStyle: getComputedStyle
    }
  }();

}(window));