"use strict";

const { Router } = require('express');
const { getPosts, postPost, getPost, patchPost } = require('./post.controller');
const { matchAccessTokenAndEmailByBody } = require('../../middlewares/auth-middleware');

const posts = Router();

posts.post('/', matchAccessTokenAndEmailByBody, postPost);
posts.get('/:postId', getPost);
posts.get('/', getPosts);
posts.patch('/:postId', matchAccessTokenAndEmailByBody, patchPost);

module.exports = posts;