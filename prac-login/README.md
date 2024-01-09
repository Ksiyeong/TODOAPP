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

## 10. 파일 읽어오기

데이터베이스를 연결하기 전에 임시로 json파일을 이용하여 데이터베이스를 만들어 보자.

<br />

### 10-1. 파일을 프로미스 객체로 읽어오기

성공했을 때, `.then()`

실패했을때, `.catch()` 를 사용할 수 있음

```javascript
const fs = require("fs").promises; // promise객체를 반환하도록 설정

static getUserInfo() {
    fs.readFile("./src/databases/users.json")
        .then(data => {
            // JSON파일이지만 읽어올땐, 기계어이기때문에 JSON으로 변환
            const users = JSON.parse(data);
            ...
            return userInfo;
            })
        .catch(console.log);
}
```

<br />

### 10-2. async, await

node.js는 비동기적으로 동작하기 때문에 파일을 읽는 속도는 상대적으로 느리므로 파일을 완전히 읽기 전에 다음 동작을 하게 된다.
그러므로 동기적으로 동작하도록 async, await을 사용해주어야 한다.

```javascript
async login() {
    const userInfo = await getUserInfo();
}
```

<br />

## 11. mariaDB

`npm i mariadb` 패키지 설치를 해줍니다.

<br />

### 11-1. db연결 및 모듈화

이후 `app/src/config/db.js` 를 생성하여 db 연결 및 모듈화합니다.

```javascript
"use strict";

const mariadb = require("mariadb/callback");

const db = mariadb.createConnection({
    host: "localhost",
    port: "3307",
    user: "root",
    database: "prac_login"
});

module.exports = db;
```

<br />

### 11-2. 쿼리 조회하기

`UserStorage.js`에서 db모듈을 사용하는 메서드를 생성해줍니다.

`db.query()`는 프로미스 객체를 반환하므로, 프로미스 객체를 생성하여 반환하도록 해줍니다.

프로미스 객체는 콜백함수를 인자로 받으며 성공 시 resolve를 실행하고 실패 시 reject를 실행합니다.

```javascript
const db = require("../config/db");

static getUserInfo(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM users WHERE id = ?", [id], (err, data) => {
            if (err) reject(err);
            resolve(data[0]);
        });
    });
}
```

<br />

## 12. dotenv로 환경변수 관리하기

깃허브에 올라가면 안되는 민감정보들을 환경변수로 등록하여 따로 관리하도록 도와주는 모듈

`npm i dotenv`를 통하여 해당 모듈을 설치한다.

<br />

`app/.env`경로에 파일을 생성한 뒤 등록할 환경변수를 입력한다.

```javascript
PORT = 3000

# DB
DB_HOST = "주소"
DB_PORT = "포트"
DB_USER = "유저명"
DB_PASSWORD = "암호"
DB_DATABASE = "데이터베이스명"
```

<br />

아래와 같이 작성하면 환경변수를 사용할 준비가 모두 끝이난다.

```javascript
// app.js
const dotenv = require("dotenv");
dotenv.config();
```

<br />

이 후 해당 환경변수를 사용할 파일에서 `process.env.환경변수명`을 통하여 사용할 수 있다.

```javascript
// 예시
const db = mariadb.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});
```

<br />

### ***‼️`.gitignore`에 해당 환경변수 파일은 깃허브에 업로드되지 않도록 관리하여야 한다.***

<br />

## 13. 로그 관리하기

대표적인 두가지 로그를 간단하게 살펴봅니다.

### ***‼️로그를 저장할 경우 `.gitignore`에 로그관련파일들이 업로드 되지 않도록 주의합시다.***

<br />

### 13-1. morgan

`morgan`은 사용하기 굉장히 쉬운 로그입니다.

<br />

`npm i morgan` 를 통해 해당 모듈을 설치합니다.

로그가 저장될 원하는 위치의 경로를 작성해줍니다.

```javascript
"use strict";
// app/src/config/morganLog.js
const fs = require("fs"); // 파일을 읽고 쓰기위한 모듈
const appRoot = require("app-root-path"); // 루트 경로를 불러오기 위한 모듈

const accessLogStream = fs.createWriteStream(
    `${appRoot}/log/morganLog.log`,
    { flags: 'a' }
);

module.exports = accessLogStream;
```

<br />

`app.js`에 아래와 같이 작성해줍니다.

```javascript
// app.js
const morgan = require("morgan");
const accessLogStream = require("./src/config/morganLog");

// app.use(morgan("dev")); // 개발과정에서 콘솔에 로그를 찍어보고싶은 경우
app.use(morgan("common", { stream: accessLogStream })); // 특정 경로에 로그파일을 생성하고 싶은 경우 두번째 인자로 파일스트립을 추가해줍니다.
```

`common`, `dev` 외에도 개인적으로 튜닝도 가능하니 모듈 공식문서를 참조합니다.

<br />

### 13-2. winston

`node.js`에서 가장 널리 사용되는 로그 모듈입니다.

<br />

기본적인 셋팅

`npm i winston`을 통해 모듈을 설치합니다.

기본적인 로그 커스텀에 대한 간략한 예시 코드

```javascript
// `app/src/config/logger.js`
"use strict";

const { createLogger, transports, format } = require("winston");
const { combine, timestamp, printf, label, colorize, simple } = format;

// 로그 출력 형식에 대한 커스텀 1
const printFormat = printf(({ timestamp, label, level, message }) => {
    return `${timestamp} [${label}] ${level} : ${message}`;
});

// 로그 출력 형식에 대한 커스텀 2
const printLogFormat = {
    file: combine(
        label({
            label: "백엔드 맛보기",
        }),
        timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        printFormat
    ),

    console: combine(
        colorize(),
        simple(),
    )
};

// 로그 레벨 및 파일 또는 콘솔 출력에 대한 형식 커스텀
const opts = {
    file: new transports.File({
        filename: "winston-log.log", // access.log
        dirname: "./log",
        level: "http",
        format: printLogFormat.file,
    }),
    console: new transports.Console({
        level: "http",
        format: printLogFormat.console,
    }),
};

// 위 내용을 종합하여 내보낼 모듈
const logger = createLogger({
    transports: [opts.file],
});

// 개발용 서버일 경우 콘솔에 로그를 찍도록 추가
if (process.env.NODE_ENV !== "prod") {
    logger.add(opts.console);
}

module.exports = logger;
```

<br />

로그 출력을 사용할 위치 해당 모듈을 불러와 출력합니다.

```javascript
const logger = require("../src/config/winston-logger") // 모듈 불러오기

app.listen(PORT, () => {
    logger.info(`${PORT}번 포트에서 서버 가동 중!`); // 로그 사용
});
```

<br />

### 13-3. `morgan`과 `winston`을 함께 사용하기

`morgan`과 `winston`을 함께 사용하는 방법이다.

`morgan`으로부터 로그메세지를 받아서, `winston`이 출력해주는 형식이다.

```javascript
// app/src/config/winston-logger.js

// winston과 morgan을 합쳐서 사용하기 위한 키
logger.stream = {
    write: (message) => logger.info(message),
};
```

```javascript
// app.js
app.use(morgan("tiny", { stream: logger.stream })); // winston과 morgan을 함께 사용하기 위한 방법
```

<br />

## 14.

<br />