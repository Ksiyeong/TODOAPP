"use strict";

class UserStorage {
    // 임시 데이터
    static #users = { // 변수앞에 #을 붙이면 private으로 설정됨.
        id: ["test0", "test1", "test2"],
        password: ["0000", "1111", "2222"],
        name: ["테스트0", "테스트1", "테스트2"],
    };

    static getUsers(...fields) {
        // const users = {};
        // for (const field of fields) {
        //     if (this.#users.hasOwnProperty(field)) {
        //         users[field] = this.#users[field];
        //     }
        // }

        const users = fields.reduce((users, field) => {
            if (this.#users.hasOwnProperty(field)) {
                users[field] = this.#users[field];
            }
            return users
        }, {});

        return users;
    }

    static getUserInfo(id) {
        const idx = this.#users.id.indexOf(id);
        const userInfo = Object.keys(this.#users).reduce((user, info) => {
            user[info] = this.#users[info][idx];
            return user;
        }, {});

        return userInfo;
    }

    static save(userInfo) {
        this.#users.id.push(userInfo.id);
        this.#users.name.push(userInfo.name);
        this.#users.password.push(userInfo.password);
        return { success: true, msg: "회원가입이 완료되었습니다." };
    }
}

module.exports = UserStorage;