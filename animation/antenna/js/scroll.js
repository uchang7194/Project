(function(global){
  'use strict';

  var video_boxs, video_title_box, prev_scrolled_val = 0, video_title_bottom_value;

  function init() {
    video_boxs = document.querySelectorAll('.video-box');
    video_title_box = document.querySelector('.video-title-box');
    video_title_bottom_value = parseInt(global.getComputedStyle(video_title_box).bottom);
    bind();
  }

  function bind() {
    global.addEventListener('scroll', function(e) {
      var process_scrollY = -1 * (this.scrollY / 5);

      video_boxs.forEach(function(data) {
        data.style.top = process_scrollY + 'px';
      });

      video_title_box.style.bottom = (video_title_bottom_value + (process_scrollY * -1)) + 'px';
    })
  }

  init();
}(window));