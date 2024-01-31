"use strict";

const { Router } = require('express');
const { getUser, postUser, patchUser, login, deleteUser } = require('./user.controller');
const { matchAccessTokenAndEmailByParams } = require('../../middlewares/auth-middleware');

const users = Router();

users.post('/', postUser);
users.post('/login', login); //TODO auth로 따로 뺄까 ?
users.get('/:email', matchAccessTokenAndEmailByParams, getUser);
users.patch('/:email', matchAccessTokenAndEmailByParams, patchUser);
users.delete('/:email', matchAccessTokenAndEmailByParams, deleteUser);

module.exports = users;
