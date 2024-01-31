"use strict";

const userService = require("../user/user.service");
const postService = require("./post.service");

module.exports = {
    getPosts: (req, res, next) => {
        res.status(200).json({ message: 'getPosts' });
    },

    getPost: (req, res, next) => {

    },

    postPost: async (req, res, next) => {
        try {
            const { email, title, content } = req.body; // requestBody에서 데이터 추출

            const { userId } = await userService.findUser(email); // email로 유효한 회원 검색
            const postId = await postService.createPost(userId, title, content); // post 생성

            res.status(201).json({ postId }); // 응답
            next();
        } catch (error) {
            next(error);
        }
    },

    patchPost: (req, res, next) => {

    },
};
