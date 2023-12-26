# Jeju node.js

<br />

## 실행 방법

```
npm install
npm run start
```

<br />

## npm install '~~' -D

```npm install nodemon -D```

-D 옵션을 추가하여 설치할 경우 package.json에 devDependencies에 추가됨

이 경우, `--production` 옵션을 추가하여 배포할 프로젝트를 빌드할 때, devDependencies에 있는 패키지들은 포함되지 않는다.

<br />

## package.json.scripts

scripts 하위에 특정 명령어를 입력할 경우 해당 명령어가 실행된다.

ex)
```json
"scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
}
```

사용법 npm run `명령어`

ex)
```
npm run start -> node index.js
npm run dev -> nodemon index.js
```

<br />

## 템플릿 엔진 - nunjucks

1. import문 추가
2. `nunjucks.configure()`
3. html 작성 {% %} 문 사용하여 공통된 부분 제거

<br />

## html form 태그를 이용한 데이터 전송

```javascript
import bodyParser from 'body-parser';
// bodyParser 세팅 -> form 데이터 사용 시
app.use(bodyParser.json());
// express 기본 모듈 사용
app.use(bodyParser.urlencoded({extended: false})); 
```

<br />

## fs 모듈을 이용한 임시 DB

```javascript
import fs from 'fs';
```

1. 파일 읽어오기 (버퍼데이터 형식)
2. json 형식으로 변환
3. 변환된 json 형식에 데이터 입력
4. json -> 버퍼 다시 변환 후 파일에 저장

⭐️ 해당 방법은 어디까지 임시DB이며 다른 다양한 더 좋은 방식이 존재함