"use strict";

const userService = require("../../../../api/user/user.service");
const userRepository = require("../../../../api/user/user.repository");
const CustomError = require("../../../../utils/CustomError");

describe('createUser', () => {
    const user = {};
    const password = '1234';

    beforeEach(() => {
        user.email = 'test@test.com';
        user.name = '테스트';
        user.password = password;
    });

    it('성공', async () => {
        const expectedUser = {
            email: user.email,
            name: user.name
        };

        // given
        userRepository.existsByEmail = jest.fn().mockResolvedValue(0);
        userRepository.save = jest.fn().mockResolvedValue({ affectedRows: 1, userId: BigInt(1) });

        // when
        const result = await userService.createUser(user);

        // then
        expect(userRepository.existsByEmail).toBeCalledWith(user.email);
        expect(user.password).not.toBe(password);
        expect(userRepository.save).toBeCalledWith(user);
        expect(result).toEqual(expectedUser);
    });

    it('실패 - 이메일 중복으로 인한 예외발생', async () => {
        // given
        userRepository.existsByEmail = jest.fn().mockResolvedValue(1);
        const customError = new CustomError('CONFLICT', 409, 'U409', '이미 사용중인 이메일 입니다.');

        // when
        await expect(async () => await userService.createUser(user))
            // then
            .rejects.toThrowError(customError);
        expect(userRepository.existsByEmail).toBeCalledWith(user.email);
    });
});