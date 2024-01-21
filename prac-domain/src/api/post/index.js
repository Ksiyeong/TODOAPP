"use strict";

const { Router } = require('express');
const { getPosts } = require('./post.controller');

const posts = Router();

posts.get('/', getPosts);

module.exports = posts;