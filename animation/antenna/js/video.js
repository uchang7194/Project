(function(global){
  'use strict';

  var videos, titles, interval;

  function init() {
    videos = document.querySelectorAll('.video-box');
    titles = document.querySelectorAll('.title');
    global.setInterval(switching, 10000);
  }

  function switching() {
    var len = videos.length;

    for(var i = 0; i < len; i++) {
      var video = videos[i], 
          video_class_name = video.getAttribute('class'),
          title = titles[i],
          title_class_name = title.getAttribute('class');
          
      if(video_class_name.indexOf('invisible') > 0) {
        video.style.zIndex = '0';
        video.setAttribute('class', 'video-box');
        title.style.zIndex = '0';
        title.setAttribute('class', 'title');
      } else {
        video.style.zIndex = '200';
        video.setAttribute('class', 'video-box invisible');
        title.style.zIndex = '201';
        title.setAttribute('class', 'title invisible');
      }
    }
  }

  init();
}(window));