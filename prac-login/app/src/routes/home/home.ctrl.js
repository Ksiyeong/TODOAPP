"use strict";

const output = {
    home: (req, res) => {
        res.render("home/index");
    },
    login: (req, res) => {
        res.render("home/login");
    },
};

// 임시 데이터
const users = {
    ids: ["test0", "test1", "test2"],
    passwords: ["0000", "1111", "2222"],
};

const process = {
    login: (req, res) => {
        const { id, password } = req.body;

        if (users.ids.includes(id)) {
            const idx = users.ids.indexOf(id);
            if (users.passwords[idx] === password) {
                return res.json({
                    success: true,
                    msg: "로그인 성공",
                });
            }
        }
        return res.json({
            success: false,
            msg: "로그인 실패",
        });
    }
};

module.exports = {
    output,
    process,
};