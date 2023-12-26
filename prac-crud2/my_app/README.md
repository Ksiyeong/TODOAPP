# Jeju node.js

</br>

## 실행 방법

```
npm install
npm run start
```

</br>

## npm install '~~' -D

```npm install nodemon -D```

-D 옵션을 추가하여 설치할 경우 package.json에 devDependencies에 추가됨

이 경우, `--production` 옵션을 추가하여 배포할 프로젝트를 빌드할 때, devDependencies에 있는 패키지들은 포함되지 않는다.

</br>

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

</br>

## 템플릿 엔진 - nunjucks

1. import문 추가
2. `nunjucks.configure()`
3. html 작성 {% %} 문 사용하여 공통된 부분 제거

</br>
