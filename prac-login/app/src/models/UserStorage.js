"use strict";

const fs = require("fs").promises;

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

    static getUsers(...fields) {
        // const users = fields.reduce((users, field) => {
        //     if (this.#users.hasOwnProperty(field)) {
        //         users[field] = this.#users[field];
        //     }
        //     return users
        // }, {});

        return users;
    }

    static getUserInfo(id) {
        return fs.readFile("./src/databases/users.json")
            .then(data => {
                return this.#getUserInfo(data, id);
            })
            .catch(console.log);
    }

    static save(userInfo) {
        // this.#users.id.push(userInfo.id);
        // this.#users.name.push(userInfo.name);
        // this.#users.password.push(userInfo.password);
        return { success: true, msg: "회원가입이 완료되었습니다." };
    }
}

module.exports = UserStorage;