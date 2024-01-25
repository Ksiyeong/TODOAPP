"use strict";

const { Router } = require('express');
const { getUser, postUser, patchUser, login } = require('./user.controller');
const matchAccessTokenAndEmail = require('../../middlewares/matchAccessTokenAndEmail');

const users = Router();

users.post('/', postUser);
users.post('/login', login); //TODO auth로 따로 뺄까 ?
users.get('/:email', matchAccessTokenAndEmail, getUser);
users.patch('/:email', matchAccessTokenAndEmail, patchUser);

module.exports = users;
