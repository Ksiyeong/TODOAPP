"use strict";

const { Router } = require('express');
const { getPosts, postPost } = require('./post.controller');
const { matchAccessTokenAndEmailByBody } = require('../../middlewares/auth-middleware');

const posts = Router();

posts.get('/', getPosts);
posts.post('/', matchAccessTokenAndEmailByBody, postPost);

module.exports = posts;