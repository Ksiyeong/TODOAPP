"use strict";

const categoryRepository = require('../../../../api/category/category.repository');
const categoryService = require('../../../../api/category/category.service');
const CustomError = require('../../../../utils/CustomError');

describe('createCategory', () => {
    const name = '테스트';

    describe('name을 입력받아 중복 검사', () => {
        it('name으로 검색해서 존재하지 않으면 에러를 발생시키지 않아야 함', async () => {
            // given
            categoryRepository.existsByName = jest.fn().mockResolvedValue(0);

            // when
            await expect(async () => await categoryService.createCategory(name))
                // then
                .not.toThrowError();
            expect(categoryRepository.existsByName).toBeCalledWith(name);
        });

        it('name으로 검색해서 1이상이 나오면 409에러를 발생시킴', async () => {
            // given
            const expectedError = new CustomError('CONFLICT', 409, 'C409', '이미 사용중인 카테고리명 입니다.');
            categoryRepository.existsByName = jest.fn().mockResolvedValue(1);

            // when
            await expect(async () => await categoryService.createCategory(name))
                // then
                .rejects.toThrowError(expectedError);
            expect(categoryRepository.existsByName).toBeCalledWith(name);
        });
    });

    describe('name을 입력받아 새로운 카테고리 생성', () => {
        it('중복 검사후 생성해야함', async () => {
            // given
            categoryRepository.existsByName = jest.fn().mockResolvedValue(0);
            categoryRepository.save = jest.fn().mockResolvedValue({ affectedRows: 1, categoryId: BigInt(1) });

            // when
            await categoryService.createCategory(name);

            // then
            expect(categoryRepository.existsByName).toBeCalledWith(name);
            expect(categoryRepository.save).toBeCalledWith(name);
        });

        it('중복 검사후 카테고리 아이디와 이름을 반환', async () => {
            // given
            const expectedResult = { categoryId: 1, name };
            categoryRepository.existsByName = jest.fn().mockResolvedValue(0);
            categoryRepository.save = jest.fn().mockResolvedValue({ affectedRows: 1, categoryId: expectedResult.categoryId });

            // when
            const result = await categoryService.createCategory(name);

            // then
            expect(categoryRepository.existsByName).toBeCalledWith(name);
            expect(categoryRepository.save).toBeCalledWith(name);
            expect(result).toEqual(expectedResult);
        });
    });
});