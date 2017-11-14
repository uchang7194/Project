(function(global, U){
  'use strict';

  var skills = null, skill_btns = null, description_area = null;
  var wave_effect = null, clicked_skill_btn_index = -1;
  
  function init() {
    skills = document.querySelector('.skills');
    skill_btns = skills.querySelectorAll('a');
    description_area = document.querySelector('.intro-skills-description p');

    bind();
  }

  function bind() {
    skills.addEventListener('click', showSkillDescription);
  }
 
  function showSkillDescription(e) {
    e.preventDefault();
    var target = e.target;
    var i = 0, len = skill_btns.length;
    
    for( ; i < len; i++) {
      var skill_btn = skill_btns[i];
      if( e.target === skill_btn ) {
        if( clicked_skill_btn_index === i ) {
          return;
        }
        
        var skill_btn_text = skill_btn.innerText;

        description_area.innerText = skillDescriptions(skill_btn_text);

        // insert Wave Effect
        if( wave_effect !== null ) {
          var child = wave_effect.getWaveBox();
          var parent = child.parentNode;
          U.removeElement(parent, child);
        }
        wave_effect = new Wave(skill_btns[i], { wave_speed: 5000, wave_box_color: 'transparent', wave_colors: ['#4facfe', '#00f2fe'] });
        clicked_skill_btn_index = i;
      }
    }
    function skillDescriptions(skill) {
      console.log('skill: ', skill);
      switch(skill) {
        case 'HTML5':
          return '레이아웃 구조를 이해하고 구현, 기본적인 메타태그, 크로스 브라우징, 웹 접근성에 대한 이해를 하고 있습니다.';
        case 'CSS3':
          return 'CSS3의 셀렉터를 우선순위를 생각해 사용할 수 있고 block과 inline, position, float 등을 사용해 레이아웃을 디자인 하거나 keyframe, animation, transition을 이용해 애니메이션 효과를 주고 media query를 이용해 반응형을 제작할 수 있습니다.';
        case 'SCSS':
          return 'mixin, function, if, for, each등의 문법을 이해하고 사용하며 SCSS 특성상 기능적인 부분과 Component 부분을 나눠 스타일을 구분해서 효율적인 스타일링을 할 수 있습니다.';
        case 'Javascript':
          return '기본적인 문법에 대한 이해와 사용이 가능합니다.\n DOM 객체를 이용해 이벤트 핸들링을 할 수 있습니다.\n 함수를 사용하여 코드를 재사용 하거나 분리를 하기 위해 사용할 수 있습니다.\n Context를 이해하고 Closure를 사용 할 수 있으며 코드들이 간섭하지 못하도록 iife패턴을 사용할 수 있습니다\n .Carousel, 애니메이션 이펙트를 여러 component에서 재사용 할 수 있도록 만들어 보았습니다.';
        case 'jQuery':
          return 'jQuery Api Document를 참고할 수 있습니다.\n jQuery의 Ajax를 사용해 영화 open Api로 one page로된 영화 소개사이트를 제작해보았습니다.';
        case 'React':
          return 'React가 UI를 구현하는데 있어서 Component 별로 나눠 조립해서 사용하는 것을 이해하고 사용할 수 있습니다.\n React가 rendering될 때 VirtualDOM이 어떤 방식으로 돌아가는지 이해하고 있습니다.';
        default: 
          return '해당 스킬에 대한 설명이 없습니다.';
      }
    }
  }
  
  init();
}(window, window.Utils));