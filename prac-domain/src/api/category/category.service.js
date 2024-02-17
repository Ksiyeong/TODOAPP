"use strict";

const CustomError = require("../../utils/CustomError");
const categoryRepository = require("./category.repository");

module.exports = {
    createCategory: async (name) => {
        // name 중복 검사
        if (await categoryRepository.existsByName(name) > 0) {
            throw new CustomError('CONFLICT', 409, 'C409', '이미 사용중인 카테고리명 입니다.');
        }

        // 카테고리 생성
        const result = await categoryRepository.save(name);
        return {
            categoryId: result.categoryId,
            name
        };
    },
};
