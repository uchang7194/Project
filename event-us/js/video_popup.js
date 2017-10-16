(function(global, Utils){
  'use strict';

  var video_popup = null, 
      video_popup_btns = null, 
      video_popup_iframe = null;
  var video_urls = [
    'https://youtu.be/XsUGg8wAq3I',
    'https://www.youtube.com/watch?v=qgIeg_dhm7Q'
  ];

  function init() {
    video_popup = document.querySelector('.video-popup');
    video_popup_btns = document.querySelectorAll('.video-popup-btn');
    video_popup_iframe = document.querySelector('.video-popup-iframe');

    bind();

  }

  function bind() {
    video_popup.addEventListener('click', function(e) {
      
      if( e.target === this || e.target.getAttribute('class').indexOf('close-btn') > 0 ) {
        Utils.toggleClass(video_popup, 'active');
      }
    }, true);

    for(var i = 0, len = video_popup_btns.length; i < len; i++) {
      var btn = video_popup_btns[i];
      btn.addEventListener('click', function(url) {

        var url = url;

        return function() {
          toggleVideoPopup();
          setIframeSrc(url + '?autoplay=1');
        };

      }(video_urls[i]));
    }
  }
  function toggleVideoPopup() {
    Utils.toggleClass(video_popup, 'active');
  }
  function setIframeSrc(src) {
    video_popup_iframe.setAttribute('src', src);
  }
  init();

}(window, window.Utils));