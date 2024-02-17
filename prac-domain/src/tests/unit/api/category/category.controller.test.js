"use strict";

const categoryController = require('../../../../api/category/category.controller');
const categoryService = require('../../../../api/category/category.service');

describe('POST /categories', () => {
    describe('postCategory', () => {
        let req, res, next;
        beforeEach(() => {
            req = { body: { name: '테스트게시판' } };
            res = {
                status: jest.fn(() => res),
                json: jest.fn()
            }
            next = jest.fn();
        });

        it('카테고리 생성 성공하여 응답 201, { categoryId, name }', async () => {
            // given
            const createdCategory = {
                categoryId: 1,
                name: req.body.name
            };
            categoryService.createCategory = jest.fn().mockResolvedValue(createdCategory);

            // when
            await categoryController.postCategory(req, res, next);

            // then
            expect(categoryService.createCategory).toBeCalledWith(req.body.name);
            expect(res.status).toBeCalledWith(201);
            expect(res.json).toBeCalledWith(createdCategory);
        });

        it('카테고리 생성 중 에러 발생하여 에러핸들러로 넘김', async () => {
            // given
            const error = new Error('에러 발생');
            categoryService.createCategory = jest.fn().mockRejectedValue(error);

            // when
            await categoryController.postCategory(req, res, next);

            // then
            expect(categoryService.createCategory).toBeCalledWith(req.body.name);
            expect(next).toBeCalledWith(error);
        });
    });
});