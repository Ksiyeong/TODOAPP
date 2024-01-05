"use strict";

const UserStorage = require("./UserStorage");

class User {
    constructor(body) {
        this.body = body;
    }

    async login() {
        const { id, password } = await UserStorage.getUserInfo(this.body.id);
        if (id) {
            if (password === this.body.password) {
                return { success: true, msg: "로그인 성공" };
            }
            return { success: false, msg: "잘못된 비밀번호" };
        }
        return { success: false, msg: "존재하지 않는 아이디" };
    }

    register() {
        return UserStorage.save(this.body);
    }
}

module.exports = User;
