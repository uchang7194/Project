## 분석하기
1. head 영역
  - meta 태그
    - <meta name="google-site-verification" content="+nxGUDJ4QpAZ5l9Bsjdi102tLVC21AIh5d1Nl23908vVuFHs34=">
      > 소유권을 주장하는 사이트 혹은 앱의 소유자임을 증명하는 절차.
    - <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width">
      > 모바일, 테블릿등의 여러 디바이스 사이즈의 크기를 맞춰줌.
      - user-scalable: no 
        - 모바일 또는 테블릿 환경에서 사용자가 임의로 화면을 확대하지 못하게 함.
      - initial-scale=1.0
        - 화면이 1.0배로 초기에 확대 되어있게 만듬.
      - minimum-scale=1.0
        - 최소 축소 크기를 1.0으로 맞춤.
      - maximum-scale=1.0
        - 최대 확대 크기를 1.0으로 맞춤.
      - width=device-width
        - 화면을 device의 넓이에 맞춤.
    - <meta name="format-detection" content="telephone=no">
      > 아이폰이나 아이패드 혹은 블랙베리 등에서 자동적으로 전화번호나 이메일 주소를 감지하고 링크가 되어버리는 경우가 있음.
      - safari : <meta name="format-detection" content="telephone=no">
      - blackberry : <meta http-equiv="x-rim-auto-match" content="none">
      - window : <meta name="format-detection" content="telephone=no, address=no, email=no">
      - 전부 끄기 : <meta name="format-detection" content="no">
    - <meta name="og:type" content="website">
      - 메타 정보에 소셜 미디어에서 제공하는 부가정보를 넣어줌.
      - property
        - og:type
        - og:title
        - og:description
        - og:image
        - og:url
    - `조건부 주석`
      - IE10 미만에서만 작동하는 조건문 
      ```html
      <!--[if condition]>
      HTML 코드
      <![endif]-->
      ```
      - 사용되는 기호
        - ! : 아니다
        - lt : 작다
        - lte : 작거나 같다
        - gt : 크다
        - gte : 크거나 같다
        - () : 우선처리
        - & : 그리고
        - | : 또는
      - [참고 사이트](http://webdir.tistory.com/451)
      
2. menu
  - 문제점
    - 무분별한 스프라이트 이미지 사용으로 메뉴를 hovering 할 때 메뉴의 넓이 보다 크기 때문에 이상하게 보임.
      - 왜 그렇게 했는지?
        1. 폰트의 저작권 문제와 서버에서 처리할 폰트의 용량 때문
      - 해결 방안
        1. 무료 폰트를 찾아본다.
        2. svg를 이용한 폰트를 가지고 사용.(svg이미지는 크기가 줄어들거나 늘어나도 깨지지않는 점을 이용해서 사용.)
        3. 트래픽 문제는 요즘 이미지의 크기를 줄여주는 사이트 들이 많으니 그것들을 활용해서 사용하면 될 듯.
    - 모바일 페이지가 따로 있음에도 불구하고 왜 굳이 메뉴 컨텍스트 부분을 반응형으로 처리했는지 의문.
      - 왜 그렇게 했는지?
        1. 노트북 화면 사이즈에 맞춰서 가로 스크롤이 생기지 않게 끔 보여주려고.
      - 해결 방안
        1. @media를 활용해서 컨텐트 영역을 각 크기에 맞게 변하는 적응형 웹형태로 제작하면 될듯.(화면이 줄어들면 컬럼 영역이 밑으로 내려가게끔.)
    - 브라우저의 높이가 650px 이하로 줄어들었을 때 관련 사이트 부분이 사라져 있음.
      - 왜 그렇게 했는지?
        1. 모르겠다. 안보여줄 이유는 없는데....
  - 만들면서 문제점
    1. 생각보다 자바스크립트 활용빈도가 높음.
      - 예를 들어 메뉴의 footer 영역이 브라우저의 세로 크기가 줄어들 때 top의 크기를 고정시켜 주는 것들을 일일이 자바스크립트로 만들어줌.
      - 해결 방안
        1. @media를 사용해서 일정크기 미만일 때 크기를 고정시켜 주게끔. mixin을 만들어서 사용.
  - 궁금한 점.
    - 메뉴와 로고 부분을 margin-top: -410px 정도로 속성을 주고 padding-top: 150px을 주는걸 왜 이렇게 하는지 이해가 안감.
    - 호환성 문제로 ie에서 자식태그에 position: relative; 속성을 주고 부모에 position: relative; 속성을 줬을 경우 자식태그가 부모태그의 위치를 기준으로 움직이지 않음.