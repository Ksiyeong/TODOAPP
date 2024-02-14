"use strict";

const request = require('supertest');
const app = require('../../../../app');
const userService = require('../../../../api/user/user.service');
const CustomError = require('../../../../utils/CustomError');
const jwtUtils = require('../../../../utils/jwtUtils');
const userController = require('../../../../api/user/user.controller');

describe('POST /users', () => {
    it('회원가입 성공', async () => {
        // given
        const requestBody = {
            email: 'test3@test.com',
            name: '테스트3',
            password: '1234'
        };

        const createdUser = {
            email: requestBody.email,
            name: requestBody.name
        };
        userService.createUser = jest.fn().mockResolvedValue(createdUser);

        // when
        const res = await request(app)
            .post('/users')
            .send(requestBody);

        // then
        expect(res.status).toBe(201);
        expect(res.body).toEqual(createdUser);
        expect(userService.createUser).toHaveBeenCalledWith(requestBody);
    });

    it('회원가입 실패 - email 중복', async () => {
        // given
        const requestBody = {
            email: 'test3@test.com',
            name: '테스트3',
            password: '1234'
        };

        userService.createUser = jest.fn().mockRejectedValue(new CustomError('CONFLICT', 409, 'U409', '이미 사용중인 이메일 입니다.'));

        // when
        const res = await request(app)
            .post('/users')
            .send(requestBody);

        // then
        expect(res.status).toBe(409);
        expect(userService.createUser).toHaveBeenCalledWith(requestBody);
    });

    it('회원가입 실패 - 잘못된 email 형식', async () => {
        // given
        const requestBody = {
            email: 'test3test.com',
            name: '테스트3',
            password: '1234'
        };

        // when
        const res = await request(app)
            .post('/users')
            .send(requestBody);

        // then
        expect(res.status).toBe(400);
    });

    it('회원가입 실패 - 잘못된 name 형식(empty)', async () => {
        // given
        const requestBody = {
            email: 'test3@test.com',
            // name: '테스트3',
            password: '1234'
        };

        // when
        const res = await request(app)
            .post('/users')
            .send(requestBody);

        // then
        expect(res.status).toBe(400);
    });

    it('회원가입 실패 - 잘못된 name 형식(10자 초과)', async () => {
        // given
        const requestBody = {
            email: 'test3@test.com',
            name: '테스트테스트테스트33',
            password: '1234'
        };

        // when
        const res = await request(app)
            .post('/users')
            .send(requestBody);

        // then
        expect(res.status).toBe(400);
    });

    it('회원가입 실패 - 잘못된 password 형식(4자 미만)', async () => {
        // given
        const requestBody = {
            email: 'test3@test.com',
            name: '테스트3',
            password: '123'
        };

        // when
        const res = await request(app)
            .post('/users')
            .send(requestBody);

        // then
        expect(res.status).toBe(400);
    });

});

describe('POST /users/login', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {
                email: 'test@test.com',
                password: '1234'
            }
        };
        res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };
        next = jest.fn();
    });

    it('로그인 성공하여 정상응답', async () => {
        // given
        const user = {
            email: req.body.email,
            name: '테스트'
        };

        const accessToken = 'Bearer accessToken';
        const refreshToken = 'Bearer refreshToken';

        const expected = {
            email: user.email,
            name: user.name,
            accessToken,
            refreshToken
        };

        userService.login = jest.fn().mockResolvedValue(user);
        jwtUtils.generateAccessToken = jest.fn().mockReturnValue(accessToken);
        jwtUtils.generateRefreshToken = jest.fn().mockReturnValue(refreshToken);


        // when
        await userController.login(req, res, next);

        // then
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith(expected);
    });

    it('로그인중 에러발생하여 에러핸들러로 넘김', async () => {
        // given
        const error = new Error('에러발생');
        userService.login = jest.fn().mockRejectedValue(error);

        // when
        await userController.login(req, res, next);

        // then
        expect(userService.login).toBeCalledWith(req.body.email, req.body.password);
        expect(next).toBeCalledWith(error);
    });
});