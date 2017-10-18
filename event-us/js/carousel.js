(function(global, $, Utils){

  
  function Carousel(target, new_options) {
    // DOMs
    this.target_dom = null;
    this.old_target_dom = null;
    this.target_items = null;
    this.controller_wrapper = null;
    this.controllers = null;
    this.next_btn = null;
    this.prev_btn = null;
    this.has_each_view_doms = [];
    this.current_view_dom = 0;
    this.target_str = null;
    // options
    this.options = {
      views: [1, 2, 3, 4, 5],
      view: 0,
      resize_sizes: []
    };
    this.parent_width = 0;
    this.ul_width = 0;
    this.current_move_count = 0
    this.current_left = 0
    this.max_count = 0;
    this.my = this;

    this.extendOptions = function(new_options) {
      console.log('options', this.options);
      console.log('new_options', new_options);
      for(var props in new_options) {
        if( new_options.hasOwnProperty(props) ) {
          this.options[props] = new_options[props];
        }
      }
    }
    this.bind = function() {
      var resize_sizes = this.options.resize_sizes;
      var carousel = this;

      window.addEventListener('resize', this.resizeFn);
      
      this.prev_btn.addEventListener('click', this.prevBtnFn);      
      this.next_btn.addEventListener('click', this.nextBtnFn);      

      Array.prototype.forEach.call(this.controllers, function(data) {
        var controller_btn = data.querySelector('.controller');

        controller_btn.addEventListener('click', this.controllerFn);
      });
    }
    this.removeBind = function() {
      window.removeEventListener('resize', this.resizeFn);
      this.prev_btn.removeEventListener('click', this.prevBtnFn);
      this.next_btn.removeEventListener('click', this.nextBtnFn);
      Array.prototype.forEach.call(this.controllers, function(data) {
        var controller_btn = data.querySelector('.controller');

        controller_btn.removeEventListener('click', this.controllerFn);
      });
    }
    this.controllerFn = function() {
      var index = -parseInt(this.getAttribute('data-index'));
      this.current_left = this.parent_width * index;

      this.current_move_count = index;
      $(this.target_str).animate({ left: this.current_left + 'px' }, 500);
    }
    this.resizeFn = function() {
      console.log('resizeFn this.options', this.options);
      var resize_sizes = this.options.resize_sizes;
      var innerWidth = this.innerWidth, depth = 50;
      if( resize_sizes.length === 0 ) {
        this.swtichDOM(3);
        return;
      }
      this.setResizeSizeView(resize_sizes);
      // setTargetDOMStyle(options.views[current_view_dom]);
      this.current_left = (this.parent_width * this.current_move_count);
      document.querySelector(this.target_str).style.left = this.current_left + 'px';      
    }
    this.prevBtnFn = function() {
      console.log('prev this: ', this);
      console.log('clicked prev');
      this.current_move_count++;
      console.log('this.current_move_count', this.current_move_count);
      if( this.current_move_count > 0 ) {
        this.current_move_count = -this.max_count;
      } 
      this.current_left = (this.parent_width * this.current_move_count);
      $(this.target_str).animate({ left: this.current_left + 'px' }, 500);
    }
    this.nextBtnFn = function() {
      this.current_move_count--;

      if( this.current_move_count < -this.max_count ) {
        this.current_move_count = 0;
      }
      this.current_left = (this.parent_width * this.current_move_count);
      $(this.target_str).animate({ left: this.current_left + 'px' }, 500);
    }
    // init에서 여러 view가 적용된 carousel_wrapper를 만들어 배열에 저장시키기
    this.setResizeSizeView = function(resize_sizes) {
      console.log('resize_size', resize_sizes);
      for(var i = 0, len = resize_sizes.length; i < len; i++) {
        var resize_size = resize_sizes[i];

        if( resize_size.max_size === -1 ) {
          if( innerWidth > resize_size.min_size ) {
            this.switchDOM(resize_size.view);
          }
        } else if( resize_size.min_size === -1 ) {
          if( innerWidth < resize_size.max_size ) {
            this.switchDOM(resize_size.view);
          }
        } else {
          if( innerWidth < resize_size.max_size && innerWidth > resize_size.min_size ) {
            this.switchDOM(resize_size.view);
          }
        }
      }
    }
    this.setDomStyles = function(view) {
      // 객체로 return 시키기
      // key: el, max_count 
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

      var len = parseInt(this.target_items.length / view);
      len = len + ((this.target_items.length % view === 0) ? -1 : 0);

      for( var i = 0; i <= len; i++ ) {
        var controller_li = document.createElement('li');
        var controller = document.createElement('button');

        controller.setAttribute('class', 'controller ' + i);
        controller.setAttribute('data-index', i);
        
        controller_li.appendChild(controller);
        controller_ul.appendChild(controller_li);
      }

      _controller_wrapper.appendChild(controller_ul);
      carousel_wrapper.appendChild(this.target_dom.cloneNode(true));
      carousel_wrapper.appendChild(_controller_wrapper);
      carousel_wrapper.appendChild(_prev_btn);
      carousel_wrapper.appendChild(_next_btn);

      return {
        el: carousel_wrapper,
        max_count: len
      };
    }

    this.switchDOM = function(index) {
      var data = this.has_each_view_doms[index],
          new_target = data.el,
          old_target = this.target_dom,
          parent = this.target_dom.parentNode;
      
      this.replaceTargetDom(parent, new_target, old_target);
      this.target_dom = new_target;
      this.current_view_dom = index;
      this.setGlobalVariable(data);
      this.setTargetDOMStyle(this.options.views[index]);
      this.removeBind();
      this.bind();
    }
    this.replaceTargetDom = function(parent, new_target, old_target) {
      return parent.replaceChild(new_target, old_target);
    }
    this.setGlobalVariable = function(data) {

      var target = data.el;
      // set DOM
      this.target_dom = target;
      this.target_items = target.querySelectorAll(this.target_str + ' li');
      this.controller_wrapper = target.querySelector('controller-wrapper');
      this.controllers = target.querySelectorAll('.controller-wrapper li')
      this.prev_btn = target.querySelector('.move-btn.prev');
      this.next_btn = target.querySelector('.move-btn.next');

      // set variable
      this.max_count = data.max_count;
      console.log('data.max_count: ', data.max_count);
      console.log('this.max_count: ', this.max_count);
    }
    this.setTargetDOMStyle = function(view) {
      var ul = this.target_dom.querySelector(this.target_str);
      var li_count = this.target_items.length;

      this.parent_width = this.getParentWidth(this.target_dom.parentNode);
      ul_width = ((this.parent_width * li_count) / view);
      ul.style.width = ul_width + 'px';
      
      this.setTargetItemsStyle(view);
      
    }

    this.setTargetItemsStyle = function(view) {

      var division_count = view,
          li_count = this.target_items.length;

      for(var i = 0; i < li_count; i++) {
        var li = this.target_items[i];
        li.style.width = (this.parent_width / division_count) + 'px';
      }
    }

    this.getParentWidth = function(parent) {
      return parseInt(global.getComputedStyle(parent).width);
    }
    this.init = function(target, new_options) {
      
      console.group('init');
      console.log('init start');
      if( typeof target !== 'string') {
        throw 'selector를 입력하세요.';
      }
      var views = [];
      console.log('current_move_count', this.current_move_count);
      this.target_str = target;
      console.log('this.target_str', this.target_str);
      this.extendOptions(new_options);
      console.log('options', this.options);
      console.log(this.options.resize_sizes);
      this.target_dom = document.querySelector(target);
      
      this.target_items = this.target_dom.querySelectorAll('li');
      
      views = this.options.views;
      for(var i = 0, len = views.length; i < len; i++) {
        var view = views[i];
        // has_each_view_doms.push(temp); 
        this.has_each_view_doms.push(this.setDomStyles(view));
      }
      
      this.setResizeSizeView(this.options.resize_sizes);
      
      // switchDOM(options.view);
      console.groupEnd('init');
    }
    
    this.resizeFn = this.resizeFn.bind(this);
    this.nextBtnFn = this.nextBtnFn.bind(this);
    this.prevBtnFn = this.prevBtnFn.bind(this);
    this.controllerFn = this.controllerFn.bind(this);
    this.init(target, new_options);
    this.bind();
  }

  global.Carousel = Carousel;

}(window, window.jQuery, window.Utils));