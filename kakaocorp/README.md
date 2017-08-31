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
      
      