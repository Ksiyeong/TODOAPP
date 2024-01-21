"use strict";

const userRepository = require("./user.repository");

module.exports = {
    createUser: (user) => {
        try {
            const response = userRepository.save(user);
            console.log(response);

        } catch (error) {
            console.log(error);
        }

        return user;
    },

    findUser: async (email) => {
        const user = await userRepository.findByEmail(email);
        return user;
    },

    updateUser: () => {

    },
};
