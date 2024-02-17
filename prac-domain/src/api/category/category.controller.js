"use strict";

const categoryService = require("./category.service");

module.exports = {
    postCategory: async (req, res, next) => {
        try {
            console.log('안뇽1');
            const response = await categoryService.createCategory(req.body.name);
            console.log('안뇽2');
            res.status(201).json(response);
            next();
        } catch (error) {
            next(error);
        }
    },
};
