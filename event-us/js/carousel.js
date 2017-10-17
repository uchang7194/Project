(function(global, $, Utils){

  // var $ = global.jQuery;

  console.log(global.$);
  function Carousel(target, new_options) {
    this.init(target, new_options);
    this.bind();
  }

  var prototypes = function() {
    // DOMs
    var target_dom = null, 
        target_items = null,
        controller_wrapper = null,
        controllers = null,
        next_btn = null,
        prev_btn = null;
    var target_str = null;
    // options
    var options = {
      view: 1,
      resize_sizes: [844, 1091]
    }
    // variable
    var parent_width = 0, ul_width = 0;
    var current_move_count = 0, current_left = 0, max_count = 0;
    var init = function(target, new_options) {

      if( typeof target !== 'string') {
        throw 'selector를 입력하세요.';
      }

      target_str = target;
      extendOptions(new_options);
      target_dom = document.querySelector(target);

      target_items = target_dom.querySelectorAll('li');
      setDomStyles();
      setTargetDOMStyle();
    }
    var bind = function() {
      var resize_sizes = options.resize_sizes;
  
      window.addEventListener('resize', function() {
        var innerWidth = this.innerWidth, depth = 50;
        current_left = (parent_width * current_move_count);
        document.querySelector(target_str).style.left = current_left + 'px';      
        setTargetDOMStyle();
      });
      
      prev_btn.addEventListener('click', function() {
        
        current_move_count++;
        if( current_move_count > 0 ) {
          current_move_count = -max_count;
        } 
        current_left = parent_width * current_move_count;
        $(target_str).animate({ left: current_left + 'px' }, 500);
      });      
      next_btn.addEventListener('click', function() {
        current_move_count--;
        // console.log('max_count', max_count);
        // console.log('current_move_count', current_move_count);
        if( current_move_count < -max_count ) {
          current_move_count = 0;
        }
        current_left = parent_width * current_move_count;
        $(target_str).animate({ left: current_left + 'px' }, 500);
      });      

      Array.prototype.forEach.call(controllers, function(data) {
        var controller_btn = data.querySelector('.controller');

        controller_btn.addEventListener('click', controllerFn);
        console.log(data);
      });
    }
    
    function controllerFn() {
      var index = this.getAttribute('data-index');
      console.log('current_move_count', current_move_count);
      console.log('index', index);
      if( current_move_count > index ) {
        current_left += (parent_width * (current_move_count - index));  
      } else if ( current_move_count < index ) {
        current_left -= (parent_width * (index - current_move_count));
      } 
      console.log('current_left', current_left);
      current_move_count = index;
      $(target_str).animate({ left: current_left + 'px' }, 500);
    }
    var extendOptions = function(new_options) {
      for(var props in new_options) {
        if( new_options.hasOwnProperty(props) ) {
          options[props] = new_options[props];
        }
      }
    }
    var setDomStyles = function() {
      
      var carousel_wrapper = document.createElement('div'),
          _controller_wrapper = document.createElement('div'),
          controller_ul = document.createElement('ul'),
          _prev_btn = document.createElement('button'),
          _next_btn = document.createElement('button');

      carousel_wrapper.setAttribute('class', 'carousel-wrapper');
      _controller_wrapper.setAttribute('class', 'controller-wrapper');
      controller_ul.setAttribute('class', 'controller-list');
      _prev_btn.setAttribute('class', 'move-btn prev');
      _next_btn.setAttribute('class', 'move-btn next');

      var len = parseInt(target_items.length / options.view);
      len = len + ((target_items.length % options.view === 0) ? -1 : 0);
      max_count = len;

      for( var i = 0; i <= len; i++ ) {
        var controller_li = document.createElement('li');
        var controller = document.createElement('button');

        controller.setAttribute('class', 'controller ' + i);
        controller.setAttribute('data-index', i);
        
        controller_li.appendChild(controller);
        controller_ul.appendChild(controller_li);
      }

      _controller_wrapper.appendChild(controller_ul);

      target_dom.parentNode.replaceChild(carousel_wrapper, target_dom);

      carousel_wrapper.appendChild(target_dom);
      carousel_wrapper.appendChild(_controller_wrapper);
      carousel_wrapper.appendChild(_prev_btn);
      carousel_wrapper.appendChild(_next_btn);

      target_dom = carousel_wrapper;
      target_items = carousel_wrapper.querySelectorAll(target_str + ' li');
      controller_wrapper = carousel_wrapper.querySelector('.controller-wrapper');
      controllers = carousel_wrapper.querySelectorAll('.controller-wrapper li');
      prev_btn = _prev_btn;
      next_btn = _next_btn;
    }

    var setTargetDOMStyle = function() {
      var ul = target_dom.querySelector(target_str);
      var li_count = target_items.length;

      parent_width = getParentWidth(target_dom.parentNode);
      ul_width = ((parent_width * li_count) / options.view);
      ul.style.width = ul_width + 'px';
      
      setTargetItemsStyle(parent_width);
      
    }

    var setTargetItemsStyle = function() {

      var division_count = options.view,
          li_count = target_items.length;

      for(var i = 0; i < li_count; i++) {
        var li = target_items[i];
        li.style.width = (parent_width / division_count) + 'px';
      }
    }

    var getParentWidth = function(parent) {
      return parseInt(global.getComputedStyle(parent).width);
    }

    return {
      init: init,
      bind: bind
    }
  }();

  Carousel.prototype = prototypes;
  global.Carousel = Carousel;

}(window, window.jQuery, window.Utils));