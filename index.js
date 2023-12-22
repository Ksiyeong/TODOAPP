const express = require('express')
var cors = require('cors')
const app = express()
const port = 8080

app.use(cors()) // 모든 요청 허용

app.get('/', (req, res) => {
    res.send('Hello World')
})

// GET 요청 실습
app.get('/sound/:name', (req, res) => {
    const { name } = req.params

    const sound = {
        'dog': '멍ㅁ엄엄어머엉',
        'cat': '냥냥옹',
        'fish': '?>??뻐끔?',
        'tiger': '어흥'
    }
    if (sound.hasOwnProperty(name)) {
        res.json({ 'sound': sound[name] })
    } else {
        res.json({ 'sound': '알 수 없는 동물' })
    }

})

//id값 받기
app.get('/user/:id', (req, res) => {
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


// 포트
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})