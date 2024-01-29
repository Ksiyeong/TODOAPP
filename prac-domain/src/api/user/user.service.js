"use strict";

const bcrypt = require('bcrypt');
const CustomError = require('../../utils/CustomError');
const userRepository = require('./user.repository');

// 유효한 유저가 존재하는지 검증 메서드
const findVerifiedUserByEmail = async (email) => {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new CustomError('NOT_FOUND', 404, 'U404', '요청하신 사용자를 찾을 수 없습니다.');
    else return user;
};

const encryptPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, hashedPassword) => {
    const result = await bcrypt.compare(password, hashedPassword);
    if (!result) throw new CustomError('Unauthorized', 401, 'U401', '잘못된 비밀번호 입니다.');
};

module.exports = {
    login: async (email, password) => { //TODO auth로 뺄까??
        const user = await findVerifiedUserByEmail(email);
        await comparePassword(password, user.password);
        return user;
    },

    // 유저 생성
    createUser: async (user) => {
        // 이메일 중복 검증 로직
        const userCount = await userRepository.existsByEmail(user.email);
        if (userCount > 0) {
            throw new CustomError('CONFLICT', 409, 'U409', '이미 사용중인 이메일 입니다.');
        }

        // 미사용중인 이메일일 경우 유저 생성
        user.password = await encryptPassword(user.password);
        const result = await userRepository.save(user); // { affectedRows : int, userId: Bigint }
        return {
            email: user.email,
            name: user.name
        };
    },

    // 유저 단건 조회
    findUser: async (email) => {
        const { user_id, /*email,*/ name, created_at, modified_at } = await findVerifiedUserByEmail(email);
        return {
            userId: user_id,
            email,
            name,
            createdAt: created_at,
            modifiedAt: modified_at
        };
    },

    // 유저 업데이트
    updateUser: async (user) => {
        const findUser = await findVerifiedUserByEmail(user.email);
        await comparePassword(user.password, findUser.password);

        if (user.name) findUser.name = user.name;
        if (user.newPassword) findUser.password = await encryptPassword(user.newPassword);

        await userRepository.update(findUser);
        return {
            email: findUser.email,
            name: findUser.name,
            // password: findUser.password,
        };
    },

    // 특정 유저 삭제
    deleteUser: async (user) => {
        const findUser = await findVerifiedUserByEmail(user.email);
        await comparePassword(user.password, findUser.password);

        return await userRepository.delete(findUser.email) === 1;
    },
};
