"use strict";

const id = document.querySelector("#id"),
    name = document.querySelector("#name"),
    password = document.querySelector("#password"),
    confirmPassword = document.querySelector("#confirm-password"),
    registerBtn = document.querySelector("#button");

registerBtn.addEventListener("click", register);

function register() {
    if (!id.value) {
        return alert("아이디를 입력해주세요.");
    }
    if (!name.value) {
        return alert("이름을 입력해주세요.");
    }
    if (!password.value) {
        return alert("비밀번호를 입력해주세요.");
    }
    if (password.value !== confirmPassword.value) {
        return alert("비밀번호가 일치하지 않습니다.");
    }

    const req = {
        id: id.value,
        name: name.value,
        password: password.value,
    };

    fetch("/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                location.href = "/login";
            } else {
                if (res.err) {
                    return alert(res.err); // 실제로는 에러 내용이 클라이언트에 출력되서는 안됨
                }
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.log(new Error("회원가입 중 에러 발생"));
        });
}