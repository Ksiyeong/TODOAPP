"use strict";

const jwt = require('jsonwebtoken');
const CustomError = require('../error/CustomError');

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

function generateAccessToken(id) {
    return jwt.sign(
        {
            id: id,
            // TODO 권한 관련하여 추가할 것
        },
        JWT_ACCESS_SECRET,
        {
            algorithm: "HS256",
            expiresIn: "15m",
            issuer: "EROOM"
        }
    );
};

function generateRefreshToken(id) {//TODO role 추가
    return jwt.sign(
        {
            id: id,
        },
        JWT_REFRESH_SECRET,
        {
            algorithm: "HS256",
            expiresIn: "14d",
            issuer: "EROOM"
        }
    );
};

function refreshAccessToken(refreshToken) {
    try {
        const { id } = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
        return generateAccessToken(id);
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new CustomError(error.name, 419, "JWT419", "만료된 토큰입니다.");
        } else if (error.name === "JsonWebTokenError") {
            throw new CustomError(error.name, 401, "JWT401", "유효하지 않는 토큰입니다.");
        } else {
            throw error;
        }
    }
};

function verifyAccessToken(accessToken) {
    try {
        // { id: 'test1', iat: 1705593423, exp: 1705594323, iss: 'EROOM' }
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
};

const verifyAccessTokenAndMatchId = (req, res, next) => {
    const { id } = verifyAccessToken(req.headers['authorization']);
    if (id === req.body.id) {
        next();
    } else {
        throw new CustomError("Unauthorized", 403, "TC403", "ID에 대한 접근 권한이 없습니다.")
    }
}

module.exports = {
    generateAccessToken,
    verifyAccessToken,
    generateRefreshToken,
    refreshAccessToken,
    verifyAccessTokenAndMatchId,
};
