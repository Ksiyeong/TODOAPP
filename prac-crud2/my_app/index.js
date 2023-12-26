// esm 스타일
import express from 'express';
import path from 'path';
import nunjucks from 'nunjucks'; // 템플릿 엔진
import fs from 'fs';
import bodyParser from 'body-parser';

// < 기초 세팅 시작 >
const app = express();
const __dirname = path.resolve(); // esm에서는 __dirname을 명시해주어야함
const port = 3000;

// bodyParser 세팅 -> form 데이터 사용 시
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); // express 기본 모듈 사용
// app.use(express.json());

// file path
// my_app/data/writing.json
const filePath = path.join(__dirname, 'data', 'writing.json');

// view engine set
app.set('view engine', 'html'); // main.html -> main(.html)

// nunjucks
nunjucks.configure('views', {
    watch: true, // html 파일이 수정될 경우, 다시 반영 후 렌더링
    express: app
});
// < 기초 세팅 종료 >

// Middleware
// main page GET
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/main.html');
});

app.get('/write', (req, res) => {
    res.render('write');
});

app.post('/diaries', (req, res) => {
    // 데이터 입력받기
    const { title, content, date } = req.body;
    const diary = {
        'title': title,
        'content': content,
        'date': date
    };

    // 데이터 저장
    // 1. 임시 DB(json파일) 파일 읽어오기
    const bufferDB = fs.readFileSync(filePath); // 버퍼데이터형식
    // 2. json형식으로 변환
    const jsonDB = JSON.parse(bufferDB); // json형식으로 변환
    // 3. 데이터 입력
    jsonDB.push(diary);
    // 4. json->버퍼 변환 후 파일에 저장
    fs.writeFileSync(filePath, JSON.stringify(jsonDB));

    res.status(201).end();
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});