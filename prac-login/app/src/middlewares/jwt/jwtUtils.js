"use strict";

const jwt = require('jsonwebtoken');

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

function generateAccessToken(id) {
    return jwt.sign(
        {
            id: id,
        },
        JWT_ACCESS_SECRET,
        {
            algorithm: "HS256",
            expiresIn: "15m",
            issuer: "EROOM"
        }
    );
};

function verifyAccessToken(accessToken) {
    try {
        return jwt.verify(accessToken, JWT_ACCESS_SECRET);
        
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return { success: false, status: 419, msg: "만료된 토큰입니다." };
        } else if (error.name === "JsonWebTokenError") {
            return { success: false, status: 401, msg: "유효하지 않는 토큰입니다." };
        } else {
            console.log(error);
            return { success: false, status: 500, msg: error };
        }
    }
};

function generateRefreshToken(id) {// role 추가
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
            return { success: false, status: 419, msg: "만료된 토큰입니다." };
        } else if (error.name === "JsonWebTokenError") {
            return { success: false, status: 401, msg: "유효하지 않는 토큰입니다." };
        } else {
            console.log(error);
            return { success: false, status: 500, msg: error };
        }
    }
};

module.exports = {
    generateAccessToken,
    verifyAccessToken,
    generateRefreshToken,
    refreshAccessToken,
};
