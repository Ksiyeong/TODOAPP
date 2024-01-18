"use strict";

const app = require("../app");
const logger = require("../src/config/winston-log")

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    logger.info(`${PORT}번 포트에서 서버 가동 중!`);
});