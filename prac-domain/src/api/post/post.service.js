"use strict";

const CustomError = require("../../utils/CustomError");
const postRepository = require("./post.repository");

const findVerifiedPostByPostId = async (postId) => { // post 작성자의 email과 함께 리턴
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

    updatePost: async (postId, email, title, content) => {
        const post = await findVerifiedPostByPostId(postId);
        // 권한 검사
        if (post.email !== email) throw new CustomError('Forbidden', 403, 'P403', '게시글에 대한 접근 권한이 없습니다.');
        // 게시글 수정
        if (title) post.title = title;
        if (content) post.content = content;
        await postRepository.update(post.post_id, post.title, post.content);
        return;
    },
};
