"use strict";

const postRepository = require("./post.repository");

module.exports = {
    createPost: async (userId, title, content) => {
        const { postId } = await postRepository.save(userId, title, content);
        return Number(postId);
    },
};
