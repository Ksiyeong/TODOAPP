"use strict";

const CustomError = require("../../utils/CustomError");
const postRepository = require("./post.repository");

const findVerifiedPostByPostId = async (postId) => {
    const post = await postRepository.findByPostId(postId);
    if (post) return post;
    else throw new CustomError('Not Found', 404, 'P404', '존재하지 않는 게시글입니다.')
};

module.exports = {
    createPost: async (userId, title, content) => {
        const { postId } = await postRepository.save(userId, title, content);
        return Number(postId);
    },

    findPost: async (postId) => {
        const post = await findVerifiedPostByPostId(postId);
        return {
            postId: post.post_id,
            title: post.title,
            content: post.content,
            createdAt: post.created_at,
            modifiedAt: post.modified_at,
            userId: post.user_id,
            email: post.email,
        };
    },
};
