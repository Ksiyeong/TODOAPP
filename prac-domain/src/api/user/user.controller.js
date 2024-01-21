"use strict";

const userService = require("./user.service");

module.exports = {
    postUser: (req, res, next) => {
        const { email, name, password } = req.body;
        const user = {
            email: email,
            name: name,
            password: password
        }
        userService.createUser(user);

        res.status(201).json(user);
    },

    getUser: async (req, res, next) => {
        const user = await userService.findUser(req.params.userId);
        res.status(200).json(user);
    }
};
