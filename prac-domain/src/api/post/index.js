"use strict";

const { Router } = require('express');
const { getPosts, postPost, getPost, patchPost, deletePost } = require('./post.controller');
const { matchAccessTokenAndEmailByBody } = require('../../middlewares/auth-middleware');

const posts = Router();

posts.post('/', matchAccessTokenAndEmailByBody, postPost);
posts.get('/:postId', getPost);
posts.get('/', getPosts);
posts.patch('/:postId', matchAccessTokenAndEmailByBody, patchPost);
posts.delete('/:postId', matchAccessTokenAndEmailByBody, deletePost);

module.exports = posts;