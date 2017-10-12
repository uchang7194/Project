(function(global, $){
  'use strict';

  var nav = null, mobile_gnb_btn = null;

  function init() {
    nav = $('.gnb');
    mobile_gnb_btn = $('.mobile-gnb-btn');
    console.log(nav);
    bind();
  }

  function bind() {
    mobile_gnb_btn.click(function() {
      nav.slideToggle(200);
    });
  }
  
  init();

}(window, jQuery));