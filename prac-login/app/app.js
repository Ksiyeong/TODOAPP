"use strict"; // ECMAScript문법을 준수하겠다는 선언, 문법검사를 좀 더 엄격하게 실시함.

// 모듈
const express = require("express");
const dotenv = require("dotenv"); dotenv.config();
const bodyParser = require("body-parser");
const errorHandler = require('./src/middlewares/error/error-handler');
// const morgan = require("morgan");
// const accessLogStream = require("./src/config/morgan-logger");
// const logger = require("./src/config/winston-logger");
const app = express();

// 라우팅
const home = require("./src/routes/home");

// 앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`)); // 프런트단 js파일 위치 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
// 로그
// app.use(morgan("dev"));
// app.use(morgan("common", { stream: accessLogStream }));
// app.use(morgan("tiny", { stream: logger.stream })); // winston과 morgan을 함께 사용하기 위한 방법

app.use("/", home); // use -> 미들 웨어를 등록해주는 메서드
app.use(errorHandler); // 커스텀 에러 핸들러

module.exports = app;