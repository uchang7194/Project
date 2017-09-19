(function(global){
  var root, content1, content2, content3, content4, content5, content6;

  function init() {
    root = document.querySelector('main');
    content1 = root.querySelector('.content1');
    content2 = root.querySelector('.content2');
    content3 = root.querySelector('.content3');
    content4 = root.querySelector('.content4');
    content5 = root.querySelector('.content5');
    content6 = root.querySelector('.content6');

    bind();
  }

  function bind() {
    //scroll event
    var depth = 30;
    window.addEventListener('scroll', function(e){
      
      var scrolled = this.scrollY + window.innerHeight;

      if ((content2.offsetTop - depth) <= scrolled && (content2.offsetTop + depth) >= scrolled) {
        addScrolleddClass([
          {
            els: content2.querySelectorAll('img'), 
            time: 350
          }, 
          {
            els: content2.querySelectorAll('figcaption'), 
            time: 500
          }
        ], content2.getAttribute('class'));
      } else if ((content3.offsetTop - depth) <= scrolled && (content3.offsetTop + depth) >= scrolled) {
        addScrolleddClass([
          {
            els: content3.querySelectorAll('img'), 
            time: 350
          }, 
          {
            els: content3.querySelectorAll('figcaption'), 
            time: 500
          }
        ], content3.getAttribute('class'));
      } else if ((content4.offsetTop - depth) <= scrolled && (content4.offsetTop + depth) >= scrolled) {
        addScrolleddClass([
          {
            els: content4.querySelectorAll('img'), 
            time: 350
          }, 
          {
            els: content4.querySelectorAll('figcaption'), 
            time: 500
          }
        ], content4.getAttribute('class'));
      } else if ((content5.offsetTop - depth) <= scrolled && (content5.offsetTop + depth) >= scrolled) {
        addScrolleddClass([
          {
            els: content5.querySelectorAll('img'), 
            time: 350
          }, 
          {
            els: content5.querySelectorAll('figcaption'), 
            time: 500
          }
        ], content5.getAttribute('class'));
      } else if ((content6.offsetTop - depth) <= scrolled && (content6.offsetTop + depth) >= scrolled) {
        addScrolleddClass([
          {
            els: content6.querySelectorAll('p'), 
            time: 350
          }, 
          {
            els: content6.querySelectorAll('button'), 
            time: 500
          }
        ]);
      } 
    });
  }
  function addScrolleddClass(els, temp_class) {
    els.forEach(data => {
      setDelayed(data.els, temp_class, data.time);
    });
  }
  function setDelayed(els, temp_class, time) {
    global.setTimeout(function() {
      for(var i = 0, len = els.length; i < len; i++) {
        if(temp_class === undefined || temp_class === '') {
          els[i].setAttribute('class', 'scrolled');
        } else {
          els[i].setAttribute('class', temp_class + ' scrolled');
        }
      }
    }, time);
  }
  init();
}(window))