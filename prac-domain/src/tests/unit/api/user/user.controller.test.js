"use strict";

const request = require('supertest');
const app = require('../../../../app');
const userService = require('../../../../api/user/user.service');
const CustomError = require('../../../../utils/CustomError');

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