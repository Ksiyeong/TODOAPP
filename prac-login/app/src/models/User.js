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
        } catch (err) {
            return { success: false, err };
        }
    }

    async register() {
        try {
            const user = await UserStorage.getUserInfo(this.body.id);
            if (user) {
                return { success: false, msg: "이미 사용중인 아이디입니다." };
            } else {
                return await UserStorage.save(this.body);
            }
        } catch (err) {
            return { success: false, err };
        }
    }

    async deleteUser() {
        try {
            const user = await UserStorage.getUserInfo(this.body.id);
            if (user) {
                return await UserStorage.deleteUserById(this.body.id);
            } else {
                return { success: false, msg: "존재하지 않는 사용자입니다." };
            }
        } catch (err) {
            return { success: false, err };
        }
    }

    async updateUserById() {
        try {
            const user = await UserStorage.getUserInfo(this.body.id);
            if (user) {
                if (user.user_password !== this.body.password) {
                    return { success: false, msg: "잘못된 비밀번호" };
                }
                const newName = this.body.name ? this.body.name : user.name;
                const newPassword = this.body.new_password ? this.body.new_password : user.user_password;
                return await UserStorage.updateUserById(this.body.id, newName, newPassword);
            } else {
                return { success: false, msg: "존재하지 않는 사용자입니다." };
            }
        } catch (err) {
            return { success: false, err };
        }
    }
}

module.exports = User;
