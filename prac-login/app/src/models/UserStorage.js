"use strict";

const fs = require("fs").promises; // 삭제 예정
const db = require("../config/db");

class UserStorage {
    // 임시 데이터
    // static #users = { // 변수앞에 #을 붙이면 private으로 설정됨.
    //     id: ["test0", "test1", "test2"],
    //     password: ["0000", "1111", "2222"],
    //     name: ["테스트0", "테스트1", "테스트2"],
    // };
    // 은닉화된 변수, 메서드 등은 클래스의 최상단에 위치시킨다.
    static #getUserInfo(data, id) {
        const users = JSON.parse(data);
        const idx = users.id.indexOf(id);
        const userInfo = Object.keys(users).reduce((user, info) => {
            user[info] = users[info][idx];
            return user;
        }, {});
        return userInfo;
    }

    static #getUsers(data, fields) {
        const users = JSON.parse(data);
        return fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers
        }, {});
    }
    static getUsers(...fields) {
        return fs.readFile("./src/databases/users.json")
            .then(data => {
                return this.#getUsers(data, fields);
            })
            .catch(console.log);
    }

    static getUserInfo(id) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM users WHERE id = ?", [id], (err, data) => {
                if (err) reject(err);
                resolve(data[0]);
            });
        });
    }

    static async save(userInfo) {
        const users = await this.getUsers("id", "password", "name");

        if (users.id.includes(userInfo.id)) {
            throw "이미 사용중인 아이디입니다.";
        }

        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.password.push(userInfo.password);
        fs.writeFile("./src/databases/users.json", JSON.stringify(users));

        return { success: true, msg: "회원가입이 완료되었습니다." };
    }
}

module.exports = UserStorage;