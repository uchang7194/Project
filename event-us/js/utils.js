(function(global){
  'use strict';


  window.Utils = function() {
    // utils
    var typeValidation = function(target, type) {
      return (typeof target === type) ? true : false;
    }
    var domValidation = function(target) {
      return (target.nodeType === 1) ? true : false;
    }

    var hasClass = function(target, class_name) {

      if( !domValidation(target) ) { throw 'in not a DOM Object'; }
      if( !typeValidation(class_name, 'string') ) { throw 'is not a String type'; }
      var dom_class_name = target.getAttribute('class');
      if( dom_class_name === null ) { return false; } 
      return dom_class_name.indexOf(class_name) >= 0 ? true : false;
    }

    var addClass = function(target, class_name) {

      if( !domValidation(target) ) { throw 'in not a DOM Object'; }
      if( !typeValidation(class_name, 'string') ) { throw 'is not a String type'; }
      if( hasClass(target, class_name) ) { return; }
      var target_class_name = target.getAttribute('class'), new_class_name = '';

      if( target_class_name === null ) {
        new_class_name = class_name;
        target.setAttribute('class', new_class_name);  
        return;
      }

      new_class_name = target_class_name + ' ' + class_name;
      target.setAttribute('class', new_class_name);
    }
    var removeClass = function(target, class_name) {

      if( !domValidation(target) ) { throw 'in not a DOM Object'; }
      if( !typeValidation(class_name, 'string') ) { throw 'is not a String type'; }

      var removed_class_name = target.getAttribute('class').replace(class_name, '').trim();

      target.setAttribute('class', removed_class_name);
    }
    var toggleClass = function(target, class_name) {

      if( !hasClass(target, class_name) ) {
        addClass(target, class_name);
      } else {
        removeClass(target, class_name);
      }
    }
    return {
      // validation
      typeValidation: typeValidation,
      domValidation: domValidation,
      // classes
      hasClass: hasClass,
      addClass: addClass,
      removeClass: removeClass,
      toggleClass: toggleClass
    }
  }();

}(window));