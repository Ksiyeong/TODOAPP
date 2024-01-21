"use strict";

const userRepository = require("./user.repository");

module.exports = {
    createUser: (user) => {
        userRepository.save(user);
        return user;
    },

    findUser: async (email) => {
        const user = await userRepository.findByEmail(email);
        return user;
    },

    updateUser: () => {

    },
};
