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
}

module.exports = UserStorage;