"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

// 프론트엔드
router.get("/", ctrl.output.home);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);

// 백엔드
router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);
router.delete("/users", ctrl.process.deleteUser);

module.exports = router;