"use strict";

const { db } = require("../../config/database");

module.exports = {
    save: (userId, title, content, categoryId) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO post (user_id, title, content, category_id) VALUES(?, ?, ?, ?);';
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

    search: (param, categoryId, limit, offset) => {
        return new Promise((resolve, reject) => {
            let query = `
            SELECT p.*, u.email, c.name AS category_name FROM post p
            INNER JOIN users u ON u.user_id = p.user_id
            INNER JOIN category c ON c.category_id = p.category_id
            `;
            const parameters = [];

            // WHERE절 설정
            if (param || categoryId) {
                query += ' WHERE';
                // param 설정
                if (param) {
                    query += ' (p.title LIKE ? OR p.content LIKE ?)';
                    const searchTerm = `%${param}%`;
                    parameters.push(searchTerm, searchTerm);
                }
                // 둘다 있을 경우 AND 추가
                if (param && categoryId) query += ' AND';
                // categoryId 설정
                if (categoryId) {
                    query += ' p.category_id = ?';
                    parameters.push(categoryId);
                }
            }
            // 검색 인덱싱 설정
            query += ' LIMIT ? OFFSET ?;';
            parameters.push(limit, offset);

            db.query(query, parameters, (error, data) => {
                if (error) reject(error);
                else resolve(data);
            });
        });
    },

    getTotalCount: (param, categoryId) => { //TODO search 처럼 동적쿼리로 변경할것.
        return new Promise((resolve, reject) => {
            let query = 'SELECT COUNT(*) total FROM post';
            const parameters = [];

            // WHERE절 설정
            if (param || categoryId) {
                query += ' WHERE';
                // param 설정
                if (param) {
                    query += ' (title LIKE ? OR content LIKE ?)';
                    const searchTerm = `%${param}%`;
                    parameters.push(searchTerm, searchTerm);
                }
                // 둘다 있을 경우 AND 추가
                if (param && categoryId) query += ' AND';
                // categoryId 설정
                if (categoryId) {
                    query += ' category_id = ?';
                    parameters.push(categoryId);
                }
            }

            db.query(query, parameters, (error, data) => {
                if (error) reject(error);
                else resolve(Number(data[0].total));
            });
        });
    },
};
