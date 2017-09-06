(function(global){
  var menu_list, lists, sub_lists, side_menu_content,
      side_menu, side_content, menu_btn;

  function init() {
    menu_list = document.querySelector('.menu-list');
    lists = menu_list.querySelectorAll('.title');
    sub_lists = menu_list.querySelectorAll('.submenu');
    side_menu_content = document.querySelector('.side-menu-content');
    side_menu = document.querySelector('.side-menu');
    menu_btn = side_menu.querySelector('.menu-btn');
    side_content = document.querySelector('.side-content');
    console.log(side_content);
    bind();
  }
  
  function bind() {
    menu_list.addEventListener('click', menuEvent, true);
    menu_list.addEventListener('focus', menuEvent, true);
    menu_btn.addEventListener('click', setMenuActive);
  }

  function setMenuActive() {
    toggleClass(side_menu, 'actived');
    toggleClass(side_content, 'actived');
    toggleClass(this, 'actived');
  }

  function toggleClass(el, class_name) {
    var get_class = el.getAttribute('class'),
        set_class = '';
    
    if(get_class.match(class_name)) {
      set_class = get_class.replace(class_name, '').trim();
      el.setAttribute('class', set_class);
    } else {
      set_class = get_class + ' ' + class_name; 
      el.setAttribute('class', set_class);
    }           
  }

  function addClass(class_name, el) {

    el = el || menu_list;

    if(Element.classList) {
      el.classList.add(class_name);
    } else {
      var class_temp = el.getAttribute('class');
      el.setAttribute('class', class_temp + ' ' + class_name);
    }
  }
  function menuEvent(e) {
    
    e.stopPropagation();
    
    var target = e.target,
        class_name = target.getAttribute('class'),
        submenu = null,
        title_context = null;

    if(class_name === 'title') {
      console.log('??? 포커스 왜 안됨?');
      // this.querySelector('.' + class_name).addEventListener('click', function(e) { e.stopPropagation()});
      resetClass(sub_lists, 'submenu');
      resetClass(menu_list, 'menu-list');
      
      title_context = target.querySelector('.title-context');
      console.log('title-context', title_context);
      submenu = findParentNode(target, 1).querySelector('.submenu');
      
      if(menu_list.getAttribute('class').indexOf('actived-menu') < 0) {
        addClass('actived-menu');
        global.setTimeout(function(){
          submenu && submenu.setAttribute('class', 'submenu actived-submenu');
        }, 500);
      } else {
        submenu && submenu.setAttribute('class', 'submenu actived-submenu');
      }
    }
  }
  function resetClass(els, class_name) {
    var length = els.length;
    
    if(length === 1) {
      els.setAttribute('class', class_name);
      return;
    }
    for(var i = 0; i < length; i++) {
      els[i].setAttribute('class', class_name);
    }
  }
  function findParentNode(el, count) {
    for(var i = 0; i < count; i++) {
      el = el.parentNode;
    }
    return el;
  }
  init();
}(window));