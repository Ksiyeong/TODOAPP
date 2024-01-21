"use strict";

const { Router } = require('express');
const posts = require('../api/post');
const users = require('../api/user');

const router = Router();

router.get('/', (req, res, next) => {
    res.status(200).json({ message: 'Hello Express' });
});

router.use('/users', users);
router.use('/posts', posts);

module.exports = router;