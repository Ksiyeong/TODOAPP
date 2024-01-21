"use strict";

const { getPosts } = require('./post.controller');

const posts = require('express').Router();

posts.get('/', getPosts);

module.exports = posts;