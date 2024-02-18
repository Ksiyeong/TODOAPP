"use strict";

const { db } = require("../../config/database");

module.exports = {
    save: (userId, title, content, categoryId) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO post (user_id, title, content, categoryId) VALUES(?, ?, ?, ?);';
            db.query(query, [userId, title, content, categoryId], (error, data) => {
                if (error) reject(error);
                else resolve({ //OkPacket { affectedRows: 1, insertId: 4n, warningStatus: 0 }
                    affectedRows: data.affectedRows, // int
                    postId: data.insertId // Bigint
                });
            });
        });
    },

    findByPostId: (postId) => {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT p.*, u.email FROM post p 
            INNER JOIN users u ON u.user_id = p.user_id
            WHERE p.post_id = ?;
            `;
            db.query(query, [postId], (error, data) => {
                if (error) reject(error);
                else resolve(data[0]);
            });
        });
    },

    update: (postId, title, content) => {
        return new Promise((resolve, reject) => {
            const query = `
            UPDATE post
            SET title = ?, content = ?
            WHERE post_id = ?;
            `;
            db.query(query, [title, content, postId], (error, data) => {
                if (error) reject(error);
                else resolve(data);
            });
        });
    },

    delete: (postId) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM post WHERE post_id = ?;'
            db.query(query, [postId], (error, data) => {
                if (error) reject(error);
                else resolve(data);
            });
        });
    },

    search: (param, limit, offset) => {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT p.*, u.email FROM post p
            INNER JOIN users u ON u.user_id = p.user_id
            WHERE p.title LIKE ? OR p.content LIKE ?
            LIMIT ? OFFSET ?;
            `;
            const searchTerm = `%${param}%`;
            db.query(query, [searchTerm, searchTerm, limit, offset], (error, data) => {
                if (error) reject(error);
                else resolve(data);
            });
        });
    },

    getTotalCount: (param) => {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT COUNT(*) total FROM post
            WHERE title LIKE ? OR content LIKE ?;
            `;
            const searchTerm = `%${param}%`;
            db.query(query, [searchTerm, searchTerm], (error, data) => {
                if (error) reject(error);
                else resolve(Number(data[0].total));
            });
        });
    },
};
