"use strict";

const UserStorage = require("./UserStorage");

class User {
    constructor(body) {
        this.body = body;
    }

    async login() {
        try {
            const user = await UserStorage.getUserInfo(this.body.id);
            if (!user) {
                return { success: false, msg: "존재하지 않는 아이디" };
            } else if (user.user_password !== this.body.password) {
                return { success: false, msg: "잘못된 비밀번호" };
            } else {
                return { success: true, msg: "로그인 성공" };
            }
        } catch (error) {
            return { success: false, msg: error };
        }
    }

    async register() {
        try {
            return await UserStorage.save(this.body);
        } catch (err) {
            return { success: false, msg: err };
        }
    }
}

module.exports = User;
