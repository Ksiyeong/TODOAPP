"use strict";

const app = require('express')();
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const router = require('./routes');
const errorHandler = require('./middlewares/error-handler');
const logger = require('./middlewares/logger');
const log = require('./config/log');

// 미들웨어
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);
app.use(errorHandler);
app.use(logger);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    log.info(`Server is listening on port ${PORT}`);
});