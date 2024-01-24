"use strict";

const { Router } = require('express');
const { getUser, postUser, patchUser } = require('./user.controller');

const users = Router();

users.post('/', postUser);
users.get('/:email', getUser);
users.patch('/:email', patchUser);

module.exports = users;
