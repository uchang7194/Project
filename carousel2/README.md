## Carousel 만들기

1. 작업내용
  - 기본적인 캐러샐 기능 완성
    - 부모크기에 캐러샐 크기 맞추기
    - prev, next 버튼으로 캐러샐 움직이기
    - controller로 움직이기

  - option extends 
    - view( 한번에 보이는 이미지 개수 ) 완성
    - controller( controller 유무 선택 ) 완성
    - hover_effect( hover시 scale변화 유무 선택 ) 완성

2. issue
  - 은닉화를 시키기 위해서 carousel에 클로저를 사용하고 new를 통해 캐러샐 instance를 생성했는데 모두
    같은 자원을 사용하는 현상이 발생
    - 알고보니 Carousel을 window객체에 할당시킬 때 window.Carousel = Carousel(); 이렇게 사용을 했는데 이렇게 하면 return된 함수 하나를 계속 재할당을 하고 사용한것.