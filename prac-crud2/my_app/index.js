// esm 스타일
import express from 'express';
import path from 'path';
import nunjucks from 'nunjucks'; // 템플릿 엔진

const app = express();
const __dirname = path.resolve(); // esm에서는 __dirname을 명시해주어야함
const port = 3000;

// view engine set
app.set('view engine', 'html'); // main.html -> main(.html)

// nunjucks
nunjucks.configure('views', {
    watch: true, // html 파일이 수정될 경우, 다시 반영 후 렌더링
    express: app
});

// Middleware
// main page GET
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/main.html');
});

app.get('/write', (req, res) => {
    res.render('write.html');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});