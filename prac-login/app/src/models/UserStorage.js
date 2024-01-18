"use strict";

const db = require("../config/db");

class UserStorage {
    static getUserInfo(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE id = ?";
            db.query(query, [id], (err, data) => {
                if (err) reject(`${err}`);
                else resolve(data[0]);
            });
        });
    }

    static async save(userInfo) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO users(id, name, user_password) VALUES(?, ?, ?);";
            db.query(query, [userInfo.id, userInfo.name, userInfo.password], (err) => {
                if (err) reject(`${err}`); // `${err}` 이런식으로 넣으면 에러가 해석되서 날아감
                else resolve({ success: true, message: "회원가입이 완료되었습니다." });
            });
        });
    }

    static async deleteUserById(id) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM users WHERE id = ?";
            db.query(query, [id], (err, data) => {
                if (err) reject(`${err}`);
                else resolve({ success: true, message: "회원탈퇴가 완료되었습니다." });
            });
        });
    }

    static async updateUserById(id, newName, newPassword) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE users SET name = ?, user_password = ? WHERE id = ?";
            db.query(query, [newName, newPassword, id], (err, data) => {
                if (err) reject(`${err}`);
                else resolve({ success: true, message: "회원정보 수정이 완료되었습니다." });
            });
        });
    }
}

module.exports = UserStorage;