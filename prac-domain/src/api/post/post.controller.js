"use strict";

const userService = require("../user/user.service");
const postService = require("./post.service");
const categoryService = require('../category/category.service');

//TODO category 관련 추가해야함
module.exports = {
    // 게시글 생성
    postPost: async (req, res, next) => {
        try {
            const { email, title, content, categoryId } = req.body; // requestBody에서 데이터 추출

            const { userId } = await userService.findUser(email); // email로 유효한 회원 검색
            await categoryService.findVerifiedCategoryById(categoryId);
            const postId = await postService.createPost(userId, title, content, categoryId); // post 생성

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

    // 다건 조회(검색)
    getPosts: async (req, res, next) => {
        try {
            //TODO: 데이터 유효성 검사 해야함
            const param = req.query.param || '';
            const size = Number(req.query.size) || 10;
            const start = Number(req.query.start) || 0;

            const response = await postService.findPosts(param, size, start);

            res.status(200).json(response);
            next();
        } catch (error) {
            next(error);
        }
    },

    // 게시글 수정
    patchPost: async (req, res, next) => {
        try {
            const postId = req.params.postId;
            const { email, title, content } = req.body; // requestBody에서 데이터 추출

            await postService.updatePost(postId, email, title, content); // post 수정

            res.status(200).json({ postId });
            next();
        } catch (error) {
            next(error);
        }
    },

    // 게시글 삭제
    deletePost: async (req, res, next) => {
        try {
            const postId = req.params.postId;
            const email = req.body.email;
            await postService.deletePost(postId, email);
            res.status(204).end();
            next();
        } catch (error) {
            next(error);
        }
    },
};
