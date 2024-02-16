"use strict";

const { db } = require('../../../../config/database');
const categoryRepository = require('../../../../api/category/category.repository');

describe('existsByName', () => {
    const query = 'SELECT EXISTS (SELECT 1 FROM category WHERE name = ?) AS count;';

    it('name으로 카운트 후 count를 반환해야함', async () => {
        // given
        const name = '테스트';
        const mockedCount = 1;
        db.query = jest.fn().mockImplementation((query, values, callback) => {
            callback(null, [{ count: mockedCount }]);
        });

        // when
        const result = await categoryRepository.existsByName(name);

        // then
        expect(result).toBe(mockedCount);
        expect(db.query).toHaveBeenCalledWith(query, [name], expect.any(Function));
    });

    it('name으로 카운트 도중 에러가 발생하면 에러를 발생시켜야함', async () => {
        // given
        const name = '테스트';
        const mockedError = new Error('에러 발생');
        db.query = jest.fn().mockImplementation((query, values, callback) => {
            callback(mockedError, null);
        });

        // when
        // then
        await expect(categoryRepository.existsByName(name))
            .rejects.toThrow(mockedError);
        expect(db.query).toHaveBeenCalledWith(query, [name], expect.any(Function));
    });
});

describe('save', () => {
    const query = 'INSERT INTO category(name) VALUES(?);';

    it('name을 입력받아 category 저장', async () => {
        // given
        const name = '테스트';
        db.query = jest.fn().mockImplementation((query, values, callback) => {
            callback(null, {});
        });

        // when
        await categoryRepository.save(name);

        // then
        expect(db.query).toHaveBeenCalledWith(query, [name], expect.any(Function));
    });

    it('name을 입력받아 category 저장 중 에러가 발생하면 에러를 발생시켜야함', async () => {
        // given
        const name = '테스트';
        const mockedError = new Error('에러 발생');
        db.query = jest.fn().mockImplementation((query, values, callback) => {
            callback(mockedError, null);
        });

        // when
        // then
        await expect(categoryRepository.save(name))
            .rejects.toThrow(mockedError);
        expect(db.query).toHaveBeenCalledWith(query, [name], expect.any(Function));
    });

    it('name을 입력받아 category 저장 후 결과를 리턴{affectedRows, userId}', async () => {
        // given
        const name = '테스트';
        const data = {
            affectedRows: 1,
            insertId: BigInt(1)
        };
        db.query = jest.fn().mockImplementation((query, values, callback) => {
            callback(null, data);
        });
        const expectedResult = {
            affectedRows: data.affectedRows,
            categoryId: data.insertId
        };

        // when
        const result = await categoryRepository.save(name);

        // then
        expect(db.query).toHaveBeenCalledWith(query, [name], expect.any(Function));
        expect(result).toEqual(expectedResult);
    });
});