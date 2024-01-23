"use strict";

const { createLogger, transports, format } = require('winston');
const { combine, timestamp, printf, label, colorize, ms } = format;

// 로그 출력 형식 커스텀
const printLogFormat = {
    file: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        label({ label: 'prac_domain' }),
        ms(),
        printf(({ timestamp, label, level, message, ms, stack }) => {
            return `${timestamp} [${label}] ${level}: ${message} ${ms}\n${stack}`;
        })
    ),

    console: combine(
        colorize(),
        ms(),
        printf(({ level, message, ms, stack }) => {
            return stack
                ? `${level}: ${message} ${ms}\n${stack}`
                : `${level}: ${message} ${ms}`;
        }),
    )
};

// 로그 옵션
const opts = {
    // 파일 저장
    file: new transports.File({
        filename: 'access.log',
        dirname: './log',
        level: 'warn',
        format: printLogFormat.file,
    }),

    // 콘솔 출력
    console: new transports.Console({
        level: 'debug',
        format: printLogFormat.console,
    }),
};

// module.exports
const log = createLogger({
    transports: [opts.file],
});

// 운영 서버 아닐 경우에 콘솔에 로그 출력하도록 옵션 추가
if (process.env.NODE_ENV !== 'prod') {
    log.add(opts.console);
}

module.exports = log;