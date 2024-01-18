"use strict";

const User = require("../../models/User");
const jwtUtils = require("../../middlewares/jwt/jwtUtils");

const output = {
    home: (req, res, next) => {
        try {
            res.render("home/index");
            next();
        } catch (error) {
            next(error);
        }
    },

    login: (req, res, next) => {
        try {
            res.render("home/login");
            next();
        } catch (error) {
            next(error);
        }
    },

    register: (req, res, next) => {
        try {
            res.render("home/register");
            next();
        } catch (error) {
            next(error);
        }
    },
};

const process = {
    login: async (req, res, next) => {
        try {
            const user = new User(req.body);
            const response = await user.login();
            if (response.success) {
                response.userInfo.accessToken = jwtUtils.generateAccessToken(response.userInfo.id);
                response.userInfo.refreshToken = jwtUtils.generateRefreshToken(response.userInfo.id);
            }
            res.status(200).json(response);
            next();
        } catch (error) {
            next(error);
        }
    },

    register: async (req, res, next) => {
        try {
            const user = new User(req.body);
            const response = await user.register();
            res.status(201).json(response);
            next();
        } catch (error) {
            next(error);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const user = new User(req.body);
            const response = await user.deleteUser();
            res.status(204).json(response);
            next();
        } catch (error) {
            next(error);
        }
    },

    patchUser: async (req, res, next) => {
        try {
            const user = new User(req.body);
            const response = await user.updateUserById();
            res.json(response);
            next();
        } catch (error) {
            next(error);
        }
    },
};

module.exports = {
    output,
    process,
};