(function(global){
  'use strict';

  if(!global.utills) {
    global.utills = function() {
      var elementValidation = function(el) {
        if(el.nodeType !== 1) { throw 'Element가 아닙니다.' }
      }
      var typeValidation = function(target, type) {
        type = type.toLowerCase();
        
        if(type !== Object.prototype.toString.call(target).slice(8,-1).toLowerCase()) { throw '타입이 일치하지 않습니다.'}
      }
      var getClass = function(el) {
        elementValidation(el);
        return e.getAttribute('class');
      }
      var getElement = function(selector, root) {
        typeValidation(selector, 'string');
        elementValidation(root);
        
        root = root || document;
        return root.querySelector(selector);
      }
      var getElements = function (selector, root) {
        typeValidation(selector, 'string');
        elementValidation(root);

        root = root || document;
        return root.querySelectorAll(selector);
      }
      var getParent = function(el, depth) {
        
        elementValidation(el);
        typeValidation(depth, 'number');

        depth = depth || 1;

        do {
          el = el.parentNode;
        }while(--depth > 0)

        return el;
      }
      var getStyle = function(el, style) {
        elementValidation(el);
        typeValidation(style, 'string');

        style = style || null;

        return window.getComputedStyle(el, style);
      }
      return {
        getClass: getClass,
        getElement: getElement,
        getElements: getElements,
        getParent: getParent
      }
    }
  }

}(window));