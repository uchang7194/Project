var containers = document.querySelectorAll('.container'),
    offset_tops = [];

Array.prototype.forEach.bind(containers);

containers.forEach(function(data) {
  offset_tops.push(data.offsetTop);
});

var browser_height = window.innerHeight;
window.addEventListener('scroll', function() {
  var scrolled = this.scrollY + browser_height/4,
      term = 50;
      
  if((scrolled-term) <= offset_tops[1] && (scrolled+term) >= offset_tops[1]){
    containers[1].querySelector('span').setAttribute('class', 'scrolled');
  } else if((scrolled-term) <= offset_tops[2] && (scrolled+term) >= offset_tops[2]){
    containers[2].querySelector('span').setAttribute('class', 'scrolled');
  } else if((scrolled-term) <= offset_tops[3] && (scrolled+term) >= offset_tops[3]){
    containers[3].querySelector('span').setAttribute('class', 'scrolled');
  }
});
