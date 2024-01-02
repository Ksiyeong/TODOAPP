# prac-login

간단한 로그인 기능을 가진 앱을 통하여 전반적인 node.js에 대해 알아본다.

<br />

## 1. 실행 방법

```
npm install
npm run start
```

<br />

## 2. 템플릿 엔진 ejs

```javascript
// ejs 설치
npm i ejs

// 앱 세팅
app.set("view engine", "ejs");
```

<br />

## 3. MVC View 분리하기

`views`라는 폴더를 만들고 해당 폴더에서 view관련 파일들을 관리한다.

```javascript
// views관련 파일들의 위치를 재정의 해준다.
app.set("views", "./views");
```

<br />

## 4. MVC Controller 분리하기

### 4-1. Route 분리하기

보통 관례적으로 routes라는 폴더 안에 모아준다.
해당 폴더 하위에 따로 코드들을 모아준 뒤, module화 선언을 해준다.

```javascript
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("home/index")
});

module.exports = router; // 모듈화 선언
```

<br />

이 후 메인 js파일에 라우팅 등록 및 미들웨어 등록을 해준다.

```javascript
// 라우팅 -> 해당 파일의 위치를 정의
const home = require("./routes/home");

// use -> 미들 웨어를 등록
app.use("/", home);
```

<br />

### 4-2. Controller 분리하기

위에서 분리한 `routes/homes/index.js` 에서 router.get메서드의 내부 함수부분을 따로 분리한다.

```javascript
// home.ctrl.js

// 함수 선언
const home = (req, res) => {
    res.render("home/index");
};
const login = (req, res) => {
    res.render("home/login");
};

// 모듈화 선언
module.exports = {
    home,
    login,
};
```

```javascript
// index.js

// 모듈 사용 선언
const ctrl = require("./home.ctrl");

router.get("/", ctrl.home);
router.get("/login", ctrl.login);
```

<br />

## 5. app.listen() 모듈화

`./bin/www.js` 생성 후 해당 폴더에 관련 내용들 이동

```javascript
// www.js
"use strict";

const app = require("../app"); // app.js 파일 임포트
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`${PORT}번 포트에서 서버 가동 중!`);
});

// app.js
module.exports = app;
```