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

4. {{ 변수명.프로퍼티 }} 로 접근가능

    변수 넘겨 줄때는`res.render('detail', { 'diary': diary });`

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

<br />

## mongoDB

### community 버전 설치
https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/

```
brew tap mongodb/brew
brew update
brew install mongodb/brew/mongodb-community
```

<br />

### shell

mongoDB CLI 툴

```
brew install mongodb-community-shell

```

<br />

### compass

mongoDB GUI 툴

- https://www.mongodb.com/products/tools/compass

<br />

## mongoose

mongoDB에 접근하기 위한 라이브러리

```
npm i mongoose
```

mongoose 기본 세팅

```javascript
// mongoose connect
mongoose
    .connect('mongodb://127.0.0.1:27017/jeju')
    .then(() => console.log('mongoDB 연결 성공'))
    .catch(e => console.log(e));

// mongoose set
const { Schema } = mongoose;
const WritingSchema = new Schema({
    title: String,
    content: String,
    date: {
        type: Date,
        default: Date.now
    }
});
const Writing = mongoose.model('Writing', WritingSchema);
```

post 요청

```javascript
// mongoDB에 저장
const writing = new Writing({
    title: title,
    content: content
});

const result = await writing.save();
```

<br />
