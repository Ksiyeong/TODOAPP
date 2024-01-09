"use strict";

const { createLogger, transports, format } = require("winston");
const { combine, timestamp, printf, label, colorize, simple } = format;

const printFormat = printf(({ timestamp, label, level, message }) => {
    return `${timestamp} [${label}] ${level} : ${message}`;
});

const printLogFormat = {
    file: combine(
        label({
            label: "백엔드 맛보기",
        }),
        timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        printFormat
    ),

    console: combine(
        colorize(),
        simple(),
    )
};

const opts = {
    file: new transports.File({
        filename: "winston-log.log", // access.log
        dirname: "./log",
        level: "http",
        format: printLogFormat.file,
    }),
    console: new transports.Console({
        level: "http",
        format: printLogFormat.console,
    }),
};

const logger = createLogger({
    transports: [opts.file],
});

// 개발용 서버일 경우 콘솔에 로그를 찍도록 추가
if (process.env.NODE_ENV !== "prod") {
    logger.add(opts.console);
}

module.exports = logger;