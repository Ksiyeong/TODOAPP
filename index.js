const express = require('express')
var cors = require('cors')
const app = express()
const port = 8080

app.use(cors()); // 모든 요청 허용
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World')
})

// 임시 DB
const soundDB = {
    'dog': '멍ㅁ엄엄어머엉',
    'cat': '냥냥옹',
    'fish': '?>??뻐끔?',
    'tiger': '어흥'
}

// GET 요청 실습
app.get('/sounds/:name', (req, res) => {
    const { name } = req.params

    if (soundDB.hasOwnProperty(name)) {
        res.json({ 'sound': soundDB[name] })
    } else {
        res.json({ 'sound': '알 수 없는 동물' })
    }

})

//id값 받기
app.get('/users/:id', (req, res) => {
    const q = req.params
    console.log(q.id)

    res.json({ 'userId': q.id })
})

// 쿼리파라미터 받기
app.get('/query', (req, res) => {
    const q = req.query

    res.json({
        'search': q.search,
        'page': q.page,
        'size': q.size
    })
})

// POST 요청 실습
app.post('/sounds', (req, res) => {
    const { animal, sound } = req.body;

    if (!animal || !sound) {
        res.status(400).send("잘못된 요청입니다.");
    } else if (soundDB.hasOwnProperty(animal)) {
        res.status(409).send("이미 존재하는 animal 입니다.")
    }

    soundDB[animal] = sound;
    res.status(201).json({ animal: sound });
});

// PATCH 요청 실습
app.patch('/sounds', (req, res) => {
    const { animal, sound } = req.body;

    if (!animal || !sound) {
        res.status(400).send("잘못된 요청입니다.");
    } else if (!soundDB.hasOwnProperty(animal)) {
        res.status(404).send("존재하지 않는 animal 입니다.")
    }

    soundDB[animal] = sound;
    res.status(200).json({ animal: sound });
});


// 포트
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})