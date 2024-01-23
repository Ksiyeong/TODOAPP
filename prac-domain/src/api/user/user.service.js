"use strict";

const CustomError = require('../../utils/CustomError');
const userRepository = require('./user.repository');

// 유효한 유저가 존재하는지 검증 메서드
const findVerifiedUserByEmail = async (email) => {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new CustomError('NOT_FOUND', 404, 'U404', '요청하신 사용자를 찾을 수 없습니다.');
    else return user;
};

module.exports = {
    // 유저 생성
    createUser: async (user) => {
        // 이메일 검증 로직
        const verifiedUser = await userRepository.findByEmail(user.email)
        if (verifiedUser) {
            throw new CustomError('CONFLICT', 409, 'U409', '이미 사용중인 이메일 입니다.');
        }

        // 미사용중인 이메일일 경우 유저 생성
        const result = await userRepository.save(user); // { affectedRows : int, userId: Bigint }
        return result;
    },

    // 유저 단건 조회
    findUser: async (email) => {
        const user = await findVerifiedUserByEmail(email);
        return user;
    },

    // 유저 업데이트
    updateUser: () => {

    },
};
