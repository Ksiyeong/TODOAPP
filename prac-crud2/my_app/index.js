// esm 스타일
import express from 'express';
import path from 'path';
import nunjucks from 'nunjucks'; // 템플릿 엔진
import fs from 'fs';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// < 기초 세팅 시작 >
const app = express();
const __dirname = path.resolve(); // esm에서는 __dirname을 명시해주어야함
const port = 3000;

// bodyParser 세팅 -> form 데이터 사용 시
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // express 기본 모듈 사용
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
/*
    3번째 인자로 컬렉션 설정 가능
    미입력시 소문자모델명의 복수형으로 저장됨
    Writing -> writings
*/
const Writing = mongoose.model('Writing', WritingSchema);

// < 기초 세팅 종료 >

// Middleware
// main page GET
app.get('/', (req, res) => {
    const diaries = JSON.parse(fs.readFileSync(filePath));
    res.render('main', { 'diaries': diaries });
});

app.get('/write', (req, res) => {
    res.render('write');
});

app.get('/detail/:id', (req, res) => {
    const id = req.params.id;
    const diary = JSON.parse(fs.readFileSync(filePath))[id];

    res.render('detail', { 'diary': diary });
});

app.post('/diaries', async (req, res) => {
    // 데이터 입력받기
    const { title, content } = req.body;

    // mongoDB에 저장
    const writing = new Writing({
        title: title,
        content: content
    });

    const result = await writing.save().then(() => {
        console.log('Success');
        res.render('detail', { title: title, content: content });
    }).catch(err => {
        console.error(err)
        res.render('write')
    })


    /*
    // 데이터 저장
    // 1. 임시 DB(json파일) 파일 읽어오기
    const bufferDB = fs.readFileSync(filePath); // 버퍼데이터형식
    // 2. json형식으로 변환
    const jsonDB = JSON.parse(bufferDB); // json형식으로 변환
    // 3. 데이터 입력
    diary.id = jsonDB.length;
    jsonDB.push(diary);
    // 4. json->버퍼 변환 후 파일에 저장
    fs.writeFileSync(filePath, JSON.stringify(jsonDB));
    */

    // res.redirect(`/detail/${diary.id}`)
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});