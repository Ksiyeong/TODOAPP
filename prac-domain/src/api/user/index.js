"use strict";

const { getUser, postUser } = require('./user.controller');

const users = require('express').Router();

users.post('/', postUser);
users.get('/:userId', getUser);

module.exports = users;
