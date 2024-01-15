"use strict";

const userInfo = JSON.parse(localStorage.getItem('userInfo'));

if (userInfo) {
    document.getElementById('username').innerText = userInfo.name;

    const tagIdLogin = document.getElementById('login');
    tagIdLogin.innerText = '로그아웃';
    tagIdLogin.href = "#";
    tagIdLogin.addEventListener('click', () => {
        localStorage.removeItem('userInfo');
        location.reload();
    });
}