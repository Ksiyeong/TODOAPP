"use strict";

const { db } = require('../../../../config/database');
const categoryRepository = require('../../../../api/category/category.repository');

describe('existsByName', () => {
    const query = 'SELECT EXISTS (SELECT 1 FROM category WHERE name = ?) AS count';

    it('name으로 카운트 후 count를 반환해야함', async () => {
        // given
        const name = '테스트';
        const mockedCount = 1;
        const mockedDbQuery = jest.fn().mockImplementation((query, values, callback) => {
            callback(null, [{ count: mockedCount }]);
        });
        db.query = mockedDbQuery;

        // when
        const result = await categoryRepository.existsByName(name);

        // then
        expect(result).toBe(mockedCount);
        expect(mockedDbQuery).toHaveBeenCalledWith(query, [name], expect.any(Function));
    });

    it('name으로 카운트 도중 에러가 발생하면 에러를 발생시켜야함', async () => {
        // given
        const name = '테스트';
        const mockedError = new Error('에러 발생');
        const mockedDbQuery = jest.fn().mockImplementation((query, values, callback) => {
            callback(mockedError, null);
        });
        db.query = mockedDbQuery;

        // when
        // then
        await expect(categoryRepository.existsByName(name))
            .rejects.toThrow(mockedError);
        expect(mockedDbQuery).toHaveBeenCalledWith(query, [name], expect.any(Function));
    });
});