"use strict";

class CustomError extends Error {
    constructor(name, status, code, message) {
        super(message);
        this.name = name;
        this.status = status;
        this.code = code;
    }

    toJSON() {
        return {
            name: this.name,
            status: this.status,
            code: this.code,
            message: this.message
        }
    }
}

module.exports = CustomError;