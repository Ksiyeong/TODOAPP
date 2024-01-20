"use strict";

const app = require('express')();
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const router = require('./routes');
const morgan = require('morgan');

// 미들웨어
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use("/", router);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})