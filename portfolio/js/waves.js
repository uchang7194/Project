(function(global, U){
  'use strict';

  if( !!window.Wave ) {
    throw 'Already Wave object is exist'
  }

  function Wave(target, new_options) {

    var target_obj = null,
        wave_box = null,
        waves = [];      

    this.settings = function(){
      

      var options = {
        wave_box_color: '#feb47b',
        wave_speed: 3000,
        wave_pulse: 1500,
        wave_box_size: 1,
        wave_box_position: {
          top: '0',
          left: '50%',
          transform: 'translateX(-50%)'
        },
        wave_colors: [
          '#dce35b',
          '#45b649',
        ]
      }
      var resizeTimeout = null;
      /**
       * @method init
       * @description Wave 생성자를 초기화시키는 함수.
       */ 
      var init = function(target, new_options) {
        if( U.typeValidation(target, 'string') ) {
          target_obj = document.querySelector(target);     
        } 

        if( U.typeValidation(target, 'object') ) {
          target_obj = target;
        }

        if( U.typeValidation(new_options, 'undefined') ) {
          options = options || new_options;
        } else {
          console.log(options);
          U.extendsOption(options, new_options);
        }

        createWaveElement();
        setWaveStyle();
        bind();
        console.log('target: ', target);
        console.log('target_obj: ', target_obj);
      }
      /**
       * @method bind
       * @description 이벤트 바인딩을 모아놓는 함수.
       */
      function bind() {
        // 1. window resize(wave)

        global.addEventListener('resize', resizeFn);
      }
      /**
       * @method resizeFn
       * @methodOf bind
       * @description window resize 이벤트시 작동하는 로직의 모음.
       */ 

      function resizeFn() {
        global.clearTimeout(resizeTimeout);
        resizeTimeout = global.setTimeout(function() {
          setWaveSize();
        }, 200)
      }

      /**
       * @method createWaveElement
       * @methodOf init
       * @description wave 엘리먼트를 생성하는 함수.
       */
      function createWaveElement() {
        /*
          target 
            - div(.wave-box)
              - div(.wave one)
              - div(.wave two)
              - div(.wave three)
        */

        var fragment = document.createDocumentFragment(),
            _wave_box = document.createElement('div');

        var wave_colors = options.wave_colors;
        _wave_box.setAttribute('class', 'wave-box');


        for(var i = 0, len = wave_colors.length; i < len; i++) {
          var _wave = document.createElement('div');

          _wave.setAttribute('class', 'wave ' + i);
          
          _wave_box.appendChild(_wave);
          waves.push(_wave);
          
        }
        
        wave_box = _wave_box;
        fragment.appendChild(_wave_box);
        target_obj.appendChild(fragment);
        
      }
      
      /**
       * @function setWaveStyle
       * @description wave style을 정의하는 함수.
       */ 
      function setWaveStyle() {
        // 1. setWaveColor
        setWaveColorAndSpeed();
        // 2. wave size
        setWaveSize();
      }

      /**
       * @function setWaveColorAndSpeed
       * @methodOf setWaveStyle
       * @description wave color와 speed를 정의하는 함수.
       */
      function setWaveColorAndSpeed() {
        // wave-box, waves style value(speed, color)
        var wave_speed = options.wave_speed,
            wave_pulse = options.wave_pulse;

        var wave_box_color = options.wave_box_color,
            wave_colors = options.wave_colors,
            new_wave_box_style = {
              'background': wave_box_color 
            };

        // wave-box style extends new style
        // U.extendsOption(wave_box.style, new_wave_box_style);
        U.setComputedStyle(wave_box.style, new_wave_box_style);

        for(var i = 0, len = waves.length; i < len; i++) {
          var wave = waves[i];
          var new_wave_style = {
            'background': wave_colors[i],
            'animation-duration': wave_speed + 'ms'
          }
          // console.log(new_wave_style);
          wave_speed += wave_pulse;
          // U.extendsOption(wave.style, new_wave_style);
          U.setComputedStyle(wave.style, new_wave_style);
        }
      }
      /**
       * @method setWaveSize
       * @methodOf setWaveStyle
       * @description wave 엘리먼트의 사이즈를 정의하는 함수.
       */
      function setWaveSize() {

        var wave_box_style = U.getComputedStyle(wave_box),
            wave_box_size = options.wave_box_size;

        var wave_box_width = parseInt(wave_box_style.width, 10),
            wave_box_height = parseInt(wave_box_style.height, 10),
            wave_box_aspect = wave_box_height / wave_box_width,
            wave_box_total_size = 0,
            new_wave_box_style = options.wave_box_position;
            
        console.log('wave_box_width: ', wave_box_width);
        U.setComputedStyle(wave_box.style, new_wave_box_style);

        if( wave_box_width >= wave_box_height ) {
          wave_box_total_size = wave_box_width / wave_box_aspect * wave_box_size;
        } else {
          wave_box_total_size = wave_box_height / wave_box_aspect * wave_box_size;
        }
        console.log('wave_box_total_size: ', wave_box_total_size);
        for(var i = 0, len = waves.length; i < len; i++) {
          var _wave = waves[i];
          var new_wave_style = {
            'width': wave_box_total_size + 'px',
            'height': wave_box_total_size + 'px',
            'margin-left': -(wave_box_total_size / 2)  + 'px',
          }
          U.setComputedStyle(_wave.style, new_wave_style);
        } 
      }
      return {
        init: init
      }
    }();

    /**
     * @function getWaveBox
     * @description wave_box element를 반환하는 함수.
     */
    this.getWaveBox = function() {
      return wave_box;
    }

    this.settings.init(target, new_options);
    
  };

  global.Wave = Wave;
}(window, window.Utils));