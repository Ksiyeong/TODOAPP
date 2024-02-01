"use strict";

const userService = require("../user/user.service");
const postService = require("./post.service");

module.exports = {
    // 게시글 생성
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

    // 단건 조회
    getPost: async (req, res, next) => {
        try {
            const postId = req.params.postId;

            const post = await postService.findPost(postId);

            res.status(200).json(post);
            next();
        } catch (error) {
            next(error);
        }
    },

    // 다건 조회
    getPosts: async (req, res, next) => {
        res.status(200).json({ message: 'getPosts' });
    },

    // 게시글 수정
    patchPost: async (req, res, next) => {

    },

    // 게시글 삭제
    deletePost: async (req, res, next) => {

    },
};
