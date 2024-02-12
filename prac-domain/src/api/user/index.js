"use strict";

const { Router } = require('express');
const { getUser, postUser, patchUser, login, deleteUser } = require('./user.controller');
const { matchAccessTokenAndEmailByParams } = require('../../middlewares/auth-middleware');
const { body } = require('express-validator');
const validationHandler = require('../../middlewares/validation-handler');

const users = Router();

users.post('/',
    [
        body('email')
            .isEmail().withMessage('이메일 형태로 작성하세요'),
        body('name')
            .notEmpty().withMessage('필수')
            .isLength({ max: 10 }).withMessage('최대10자'),
        body('password')
            .isLength({ min: 4 }).withMessage('최소4자'),
        validationHandler
    ],
    postUser);
users.post('/login', login); //TODO auth로 따로 뺄까 ?
users.get('/:email', matchAccessTokenAndEmailByParams, getUser);
users.patch('/:email', matchAccessTokenAndEmailByParams, patchUser);
users.delete('/:email', matchAccessTokenAndEmailByParams, deleteUser);

module.exports = users;
