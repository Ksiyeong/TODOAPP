"use strict";

console.log("프론트단 자바스크립트 파일 동작 테스트");

// DOM -> Document Object Model

const id = document.querySelector("#id"),
    password = document.querySelector("#password"),
    loginBtn = document.querySelector("button");

loginBtn.addEventListener("click", login);

function login() {
    const req = {
        id: id.value,
        password: password.value
    };

    console.log(req);
}