"use strict";

const jwt = require('jsonwebtoken');
const CustomError = require('./CustomError');

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN;
const JWT_ISSUER = process.env.JWT_ISSUER;

module.exports = {
    generateAccessToken: (email) => {
        return jwt.sign(
            { email }, //TODO: 권한 추가할 것
            JWT_ACCESS_SECRET,
            {
                algorithm: "HS256",
                expiresIn: JWT_ACCESS_EXPIRES_IN,
                issuer: JWT_ISSUER
            }
        )
    },

    generateRefreshToken: (email) => {
        return jwt.sign(
            { email },
            JWT_REFRESH_SECRET,
            {
                algorithm: "HS256",
                expiresIn: JWT_REFRESH_EXPIRES_IN,
                issuer: JWT_ISSUER
            }
        );
    },

    refreshAccessToken: (refreshToken) => {
        try {
            const { email } = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
            return this.generateAccessToken(email);
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                throw new CustomError(error.name, 419, "JWT419", "만료된 토큰입니다.");
            } else if (error.name === "JsonWebTokenError") {
                throw new CustomError(error.name, 401, "JWT401", "유효하지 않는 토큰입니다.");
            } else {
                throw error;
            }
        }
    },

    verifyAccessToken: (accessToken) => {
        try {
            // { email: 'test1', iat: 1705593423, exp: 1705594323, iss: 'EROOM' }
            return jwt.verify(accessToken, JWT_ACCESS_SECRET);
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                throw new CustomError(error.name, 419, "JWT419", "만료된 토큰입니다.");
            } else if (error.name === "JsonWebTokenError") {
                throw new CustomError(error.name, 401, "JWT401", "유효하지 않는 토큰입니다.");
            } else {
                throw error;
            }
        }
    },
};
