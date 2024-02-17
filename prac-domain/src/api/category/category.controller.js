"use strict";

const categoryService = require("./category.service");

module.exports = {
    postCategory: async (req, res, next) => {
        try {
            const response = await categoryService.createCategory(req.body.name);
            res.status(201).json(response);
            next();
        } catch (error) {
            next(error);
        }
    },
};
