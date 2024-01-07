"use strict";

const db = require("../config/db");

class UserStorage {
    static getUserInfo(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE id = ?";
            db.query(query, [id], (err, data) => {
                if (err) reject(err);
                resolve(data[0]);
            });
        });
    }

    static async save(userInfo) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO users(id, name, user_password) VALUES(?, ?, ?);";
            db.query(query, [userInfo.id, userInfo.name, userInfo.password], (err) => {
                if (err) reject("이미 사용중인 아이디입니다."); // `${err}` 이런식으로 넣으면 에러가 해석되서 날아감
                resolve({ success: true, msg: "회원가입이 완료되었습니다." });
            });
        });
    }
}

module.exports = UserStorage;