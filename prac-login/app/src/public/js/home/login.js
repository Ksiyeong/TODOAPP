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
            if (res.status == 200) {
                localStorage.setItem('userInfo', JSON.stringify(res.userInfo));
                location.href = "/";
            } else {
                alert(res.message);
            }
        })
        .catch((err) => {
            alert(new Error("Internal Server Error"));
        });
}