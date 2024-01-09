"use strict";

// DOM -> Document Object Model

const id = document.querySelector("#id"),
    password = document.querySelector("#password"),
    loginBtn = document.querySelector("#button");

loginBtn.addEventListener("click", login);

function login() {
    if (!id.value) {
        return alert("아이디를 입력해주세요.");
    }
    if (!password.value) {
        return alert("비밀번호를 입력해주세요.");
    }

    const req = {
        id: id.value,
        password: password.value
    };

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                location.href = "/";
            } else {
                if (res.err) {
                    return alert(res.err); // 실제로는 에러 내용이 클라이언트에 출력되서는 안됨
                }
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.log(new Error("로그인 중 에러 발생"));
        });
}