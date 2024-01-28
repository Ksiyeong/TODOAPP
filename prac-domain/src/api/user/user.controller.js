"use strict";

const jwtUtils = require('../../utils/jwtUtils');
const userService = require('./user.service');

module.exports = {//TODO 패스워드 암호화 할것.
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            // email과 password 매칭여부 확인
            const user = await userService.login(email, password);

            // 토큰 발급
            const accessToken = jwtUtils.generateAccessToken(email);
            const refreshToken = jwtUtils.generateRefreshToken(email);

            // 응답
            res.status(200).json({
                email: user.email,
                name: user.name,
                accessToken,
                refreshToken,
            });
            next();
        } catch (error) {
            next(error);
        }
    },

    postUser: async (req, res, next) => {
        try {
            const { email, name, password } = req.body;
            const user = {
                email: email,
                name: name,
                password: password
            }
            await userService.createUser(user);
            res.status(201).json(user);
            next();
        } catch (error) {
            next(error);
        }
    },

    getUser: async (req, res, next) => {
        try {
            const user = await userService.findUser(req.params.email);
            res.status(200).json(user);
            next();
        } catch (error) {
            next(error);
        }
    },

    patchUser: async (req, res, next) => {
        try {
            req.body.email = req.params.email;
            const updatedUser = await userService.updateUser(req.body);
            res.status(200).json(updatedUser);
            next();
        } catch (error) {
            next(error);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            await userService.deleteUser({
                email: req.params.email,
                password: req.body.password
            });

            res.status(204).end();
            next();
        } catch (error) {
            next(error);
        }
    },
};
