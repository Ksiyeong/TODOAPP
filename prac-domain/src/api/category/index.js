"use strict";

const { Router } = require('express');
const { postCategory } = require('./category.controller');

const categories = Router();

categories.post('/', postCategory);

module.exports = categories;
