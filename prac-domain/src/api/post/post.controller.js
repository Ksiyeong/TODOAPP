"use strict";

module.exports = {
    getPosts: (req, res, next) => {
        res.status(200).json({ message: 'getPosts' });
    }
};
