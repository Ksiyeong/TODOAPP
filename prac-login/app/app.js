"use strict"; // ECMAScript문법을 준수하겠다는 선언, 문법검사를 좀 더 엄격하게 실시함.

// 모듈
const express = require("express");
const app = express();

// 라우팅
const home = require("./src/routes/home");

// 앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use("/", home); // use -> 미들 웨어를 등록해주는 메서드

module.exports = app;