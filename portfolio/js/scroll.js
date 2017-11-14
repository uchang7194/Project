(function(global, U, Wave, $){
  'use strict';

  var main_section = null, 
      intro_section = null,
      portfolio_section = null,
      contact_section = null,
      gnb = null,
      gnb_btns = null;

  var main_section_offsetTop = 0,
      intro_section_offsetTop = 0,
      portfolio_section_offsetTop = 0,
      contact_section_offsetTop = 0;
  
  var intro_section_height = 0,
      portfolio_section_height = 0,
      contact_section_height = 0;

  var wave_el = null;
  
  var gnb_btn_className = '';

  function init() {
    main_section = document.querySelector('.section.main');
    intro_section = document.querySelector('.section.intro');
    portfolio_section = document.querySelector('.section.portfolio');
    contact_section = document.querySelector('.section.contact');

    gnb = main_section.querySelector('.gnb');
    gnb_btns = gnb.querySelectorAll('a');

    main_section_offsetTop = main_section.offsetTop;
    intro_section_offsetTop = intro_section.offsetTop;
    portfolio_section_offsetTop = portfolio_section.offsetTop;
    contact_section_offsetTop = contact_section.offsetTop;

    intro_section_height = intro_section.offsetHeight;
    portfolio_section_height = portfolio_section.offsetHeight;
    contact_section_height = contact_section.offsetHeight;

    console.log(intro_section_height);
    // console.log(intro_section_offsetTop);
    // console.log(gnb_btns);
    bind();
  }

  function bind() {
    global.addEventListener('scroll', function(e) {
      scrollWaveEffect(e);
    });
    
    for(var i = 0, len = gnb_btns.length; i < len; i++) {
      var gnb_btn = gnb_btns[i];

      gnb_btn.addEventListener('click', clickedGnbBtn.bind(this));
    }
  }

  function scrollWaveEffect(e) {
    var scrollY = getScrollTop(),
        gnb_height = gnb.offsetHeight;

    if( ((intro_section_offsetTop - gnb_height) < scrollY) && (intro_section_height + intro_section_offsetTop > scrollY) ) {
      movedGnbBtn(0);
    } else if( ((portfolio_section_offsetTop - gnb_height) < scrollY) && (portfolio_section_height + portfolio_section_offsetTop > scrollY) ) {
      movedGnbBtn(1);
    } else if( ((contact_section_offsetTop - gnb_height) < scrollY) && (contact_section_height + contact_section_offsetTop > scrollY) ) {
      movedGnbBtn(2);
    } else {
      gnb_btn_className = '';
      removeWaveEffect();
    }
    
  }
  function setWaveEffect(el) {
    wave_el = new Wave(el, { wave_speed: 5000, wave_box_color: 'transparent', wave_colors: ['#4facfe', '#00f2fe'] });
  }
  function removeWaveEffect() {
    if( !wave_el ) { return; }

    var child = wave_el.getWaveBox(),
        parent = child.parentNode;

    U.removeElement(parent, child);
    wave_el = null;
  }
  function movedGnbBtn(index) {
    var intro_btn = gnb_btns[index],
        class_name = intro_btn.getAttribute('class');

    if( class_name !== gnb_btn_className ) {
      removeWaveEffect();
      setWaveEffect(intro_btn);
      // removeWaveEffect();
      console.log('한번만');
    }
    gnb_btn_className = class_name;
  }
  function clickedGnbBtn(e) {
    e.preventDefault();
    
    var target = e.target,
        move_target_text = target.innerText.toLowerCase(),
        move_target_el = null;

    switch(move_target_text) {
      case 'intro': 
        move_target_el = intro_section; 
      break;
      case 'portfolio': 
        move_target_el = portfolio_section; 
      break;
      case 'contact': 
        move_target_el = contact_section; 
      break;
    }
    removeWaveEffect();
    setWaveEffect(e.target);
    $('html, body').animate({ scrollTop: move_target_el.offsetTop - gnb.offsetHeight }, 500);
  }
  /**
   * @func getScrollTop
   * @description 현재 스크롤의 Y축 정보를 받아오는 함수.
   */
  function getScrollTop() {
    return  (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  }
  init();

}(window, window.Utils, window.Wave, window.jQuery));