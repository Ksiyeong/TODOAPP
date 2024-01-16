"use strict";

const logger = require("../../config/winston-logger");
const User = require("../../models/User");
const jwtUtils = require("../../middlewares/jwt/jwtUtils");

const output = {
    home: (req, res) => {
        logger.info(`GET / 200 "홈 화면으로 이동"`);
        res.render("home/index");
    },

    login: (req, res) => {
        logger.info(`GET /login 200 "로그인 화면으로 이동"`);
        res.render("home/login");
    },

    register: (req, res) => {
        logger.info(`GET /register 200 "회원가입 화면으로 이동"`);
        res.render("home/register");
    },
};

const process = {
    login: async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();

        if (response.success) {
            response.userInfo.accessToken = jwtUtils.generateAccessToken(response.userInfo.id);
            response.userInfo.refreshToken = jwtUtils.generateRefreshToken(response.userInfo.id);
        }

        const url = {
            method: req.method,
            path: req.path,
            status: response.err ? 500 : 200,
        };
        log(response, url);
        return res.status(url.status).json(response);
    },

    register: async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();
        const url = {
            method: req.method,
            path: req.path,
            status: response.err ? 500 : 201,
        };
        log(response, url);
        return res.json(response);
    },

    deleteUser: async (req, res) => {
        const user = new User(req.body);
        const response = await user.deleteUser();
        const url = {
            method: req.method,
            path: req.path,
            status: response.err ? 500 : 204,
        };
        log(response, url);
        return res.json(response);
    },

    patchUser: async (req, res) => {
        const user = new User(req.body);
        const response = await user.updateUserById();
        const url = {
            method: req.method,
            path: req.path,
            status: response.err ? 500 : 200,
        };
        log(response, url);
        return res.json(response);
    },
};

module.exports = {
    output,
    process,
};

const log = (response, url) => {
    if (response.err) {
        logger.error(`${url.method} ${url.path} ${url.status} Response "success: ${response.success}, ${response.err}"`);
    } else {
        logger.info(`${url.method} ${url.path} ${url.status} Response "success: ${response.success}, msg: ${response.msg}"`);
    }
};