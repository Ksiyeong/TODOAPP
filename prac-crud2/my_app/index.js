// esm 스타일
import express from 'express';
import path from 'path';
import nunjucks from 'nunjucks'; // 템플릿 엔진
// import fs from 'fs';
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
app.get('/', async (req, res) => {
    // const diaries = JSON.parse(fs.readFileSync(filePath));
    const diaries = await Writing.find();
    res.render('main', { 'diaries': diaries });
});

app.get('/write', (req, res) => {
    res.render('write');
});

app.get('/edit/:id', async (req, res) => {
    const id = req.params.id;

    let diary = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
        diary = await Writing.findById(id);
    }

    res.render('edit', { 'diary': diary });
});

app.patch('/diaries/:id', async (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;

    if (mongoose.Types.ObjectId.isValid(id)) {
        await Writing.findByIdAndUpdate(id, { title: title, content: content });
    }

    return res.status(200).send('수정이 완료되었습니다.');
});

app.get('/detail/:id', async (req, res) => {
    const id = req.params.id;
    // const diary = JSON.parse(fs.readFileSync(filePath))[id];
    // const diary = await Writing.findOne({ _id: id });

    let diary = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
        diary = await Writing.findById(id);
    }

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
        console.error(err);
        res.render('write');
    })
});

app.delete('/diaries/:id', async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log('유효하지 않은 id입니다.');
        return res.redirect(`/detail/${id}`);
    }

    const diary = await Writing.findById(id);
    if (diary == null) {
        console.log('404 NOT FOUND');
    } else {
        await Writing.deleteOne(diary);
        console.log('삭제 요청 처리 완료');
    }

    return res.status(204).send('No content');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});