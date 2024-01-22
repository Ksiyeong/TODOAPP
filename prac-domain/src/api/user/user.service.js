"use strict";

const CustomError = require("../../utils/CustomError");
const userRepository = require("./user.repository");

module.exports = {
    createUser: async (user) => {
        // 사용중인 이메일인지 검증
        const verifiedUser = await userRepository.findByEmail(user.email)
        if (verifiedUser) {
            throw new CustomError('Conflict', 409, 'U409', '이미 사용중인 이메일 입니다.');
        }

        // 미사용중인 이메일일 경우 유저 생성
        await userRepository.save(user);
        return;
    },

    findUser: async (email) => {
        const user = await userRepository.findByEmail(email);
        return user;
    },

    updateUser: () => {

    },
};
