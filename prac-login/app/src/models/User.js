"use strict";

const UserStorage = require("./UserStorage");
const CustomError = require('../middlewares/error/CustomError');

class User {
    constructor(body) {
        this.body = body;
    }

    async login() {
        const user = await this.#findVerifiedUserById();
        if (user.user_password === this.body.password) {
            const userInfo = {
                id: user.id,
                name: user.name,
            };
            return { success: true, msg: "로그인 성공", userInfo };
        } else {
            throw new CustomError("Unauthorized", 401, "U401", "잘못된 비밀번호 입니다.");
        }
    }

    async register() {
        const user = await UserStorage.getUserInfo(this.body.id);
        if (user) {
            throw new CustomError("Conflict", 409, "U409", "이미 사용중인 아이디 입니다.");
        }
        return await UserStorage.save(this.body);
    }

    async deleteUser() {
        const { id, user_password: password } = await this.#findVerifiedUserById();
        if (this.body.id === id && this.body.password === password) {
            return await UserStorage.deleteUserById(id);
        } else {
            throw new CustomError("Unauthorized", 401, "U401", "잘못된 비밀번호 입니다.");
        }
    }

    async updateUserById() {
        const { name, user_password: password } = await this.#findVerifiedUserById();
        if (password !== this.body.password) {
            throw new CustomError("Unauthorized", 401, "U401", "잘못된 비밀번호 입니다.");
        }
        const newName = this.body.name ? this.body.name : name;
        const newPassword = this.body.new_password ? this.body.new_password : password;
        return await UserStorage.updateUserById(this.body.id, newName, newPassword);
    }

    async #findVerifiedUserById() {
        const user = await UserStorage.getUserInfo(this.body.id);
        if (!user) {
            throw new CustomError("UserNotFound", 404, "UNF404", "요청하신 사용자를 찾을 수 없습니다.");
        }
        return user;
    }
}

module.exports = User;
