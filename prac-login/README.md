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

<br />

## 6. 프론트단 js파일 만들기

js파일을 위치하고 싶은 경로에 생성

```
src/public/js/home/login.js
```

<br />

해당 js파일을 원하는 ejs(html) 파일에 `<script>` 추가

```html
<script src="/js/home/login.js"></script>
```

<br />

`app.js`에 위에서 지정한 프런트단 js파일 위치 설정

```javascript
app.use(express.static(`${__dirname}/src/public`));
```

<br />

## 7. `DOM`을 이용하여 HTML 객체 읽어오기

`DOM(Document Object Model)` 문서 객체 모델

`document.~~`와 같은 방법으로 사용

`javascript`와 `HTML` 사이에서 둘을 연결해주는 프로그래밍 `interface` 이다.
(`javascript`는 `DOM`과 통신하고, `HTML`은 `DOM`과 통신하는 모양세)

<br />

`HTML`에서는 다음과 같은 방법으로 id 등의 각 태그들을 특정할 수 있도록 명시해준다.

`<script>`에서 `defer`의 역할 : `<script>`다운로드를 백그라운드에서 진행하며, HTML이 완전히 로드된 이후에 해당 `<script>`를 실행한다.

```HTML
<script src="/js/home/login.js" defer></script>

<input id="id" type="text" placeholder="아이디"><br>
<input id="password" type="text" placeholder="비밀번호"><br>
```

<br />

`javascript`에서는 다음과 같은 방식으로 작성한다.

```javascript
// javascript, HTML태그에 id를 사용했을 경우 #을 사용. 이외에도 다양한 방법으로 접근 가능
const id = document.querySelector("#id"),
    password = document.querySelector("#password"),
    loginBtn = document.querySelector("button");

loginBtn.addEventListener("click", login);

function login() {
    const req = {
        id: id.value,
        password: password.value
    };

    console.log(req);
}
```

<br />

## 8. 로그인 요청 `fetch`생성

fetch를 이용하여 서버에게 다양한 요청을 할 수 있다.

```javascript
fetch("/login",{
    method:"POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
});
// 위 예시 외에도 다양한 것들을 담을 수 있음.
```

<br />

## 9. MVC Model 분리하기

Controller에 모든 로직이 들어있는 형태는 협업, 유지보수, 가독성 등 다양한 방면에서 좋지않다.
분리해주도록 하자.

UserStorage와 User로 분리하여 각각 코드를 작성한다.

<br />

### 9-1. UserStorage

UserStorage는 DB에 접근해 데이터를 가져오는 역할이다.
(스프링으로 치면 Repository정도 되는듯)

`src/models/UserStorage.js`

```javascript
"use strict";

class UserStorage {
    // 임시 데이터
    static #users = { // 변수앞에 #을 붙이면 private으로 설정됨.
        id: ["test0", "test1", "test2"],
        password: ["0000", "1111", "2222"],
        name: ["테스트0", "테스트1", "테스트2"],
    };

    static getUsers(...fields) {
        const users = fields.reduce((users, field) => { // for문 써도 무방함

            if (this.#users.hasOwnProperty(field)) {
                users[field] = this.#users[field];
            }
            return users
        }, {});

        return users;
    }

    static getUserInfo(id) {
        const idx = this.#users.id.indexOf(id);
        const userInfo = Object.keys(this.#users).reduce((user, info) => {
            user[info] = this.#users[info][idx];
            return user;
        }, {});

        return userInfo;
    }
}

module.exports = UserStorage;
```

<br />

### 9-2. User

Controller와 UserStorage 사이에서 business로직을 처리하는 단계(?)

`src/models/User.js`

```javascript
"use strict";

const UserStorage = require("./UserStorage");

class User {
    constructor(body) {
        this.body = body;
    }

    login() {
        const { id, password } = UserStorage.getUserInfo(this.body.id);
        if (id) {
            if (password === this.body.password) {
                return { success: true, msg: "로그인 성공" };
            }
            return { success: false, msg: "잘못된 비밀번호" };
        }
        return { success: false, msg: "존재하지 않는 아이디" };
    }
}

module.exports = User;
```

<br />
