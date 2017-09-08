(function(global){
  var related_site_btn;

  function init() {
    related_site_btn = document.querySelector('.relatied-site-btn');
    bind();
  }

  function bind() {
    related_site_btn.addEventListener('click', activedRelatedBox);
    related_site_btn.addEventListener('focus', activedRelatedBox);
  }

  function activedRelatedBox() {
    var parent = related_site_btn.parentNode.parentNode,
        related_site_box = parent.querySelector('.related-site-box');
    console.log('parent', parent);
    console.log('related_site_box', related_site_box)
    toggleClass(related_site_box, 'actived');
  }
  function toggleClass(el, class_name) {
    var get_class = el.getAttribute('class');
        set_class = '';
    
    if(get_class.match(class_name)) {
      set_class = get_class.replace(class_name, '').trim();
      el.setAttribute('class', set_class);
    } else {
      set_class = get_class + ' ' + class_name; 
      el.setAttribute('class', set_class);
    }           
  }
  init();
}(window));