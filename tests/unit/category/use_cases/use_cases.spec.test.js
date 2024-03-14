import chai from 'chai';
import sinon from 'sinon';
import faker from 'faker';

import category from '../../../../src/entities/category';
import addCategory from '../../../../application/use_cases/category/add';
import findAll from '../../../../application/use_cases/category/findAll';
import findById from '../../../../application/use_cases/category/findById';
import categoryDbRepository from '../../../../application/repositories/categoryDbRepository';

const { expect } = chai;

let dbRepository = null;

describe('Use cases', () => {
    beforeEach(() => {
        dbRepository = categoryDbRepository();
    });

    describe('Fetch a specific category', () => {
        it('should fetch a category by id', () => {
            const stubCategory = {
                name: faker.name.findName(),
                icon: faker.lorem.sentence(),
                color: faker.lorem.sentence(),
                userId: faker.datatype.uuid(),
                familyId: faker.datatype.uuid()
            };
            const correspondingCategory = category({
                name: stubCategory.name,
                icon: stubCategory.icon,
                color: stubCategory.color,
                userId: stubCategory.userId,
                familyId: stubCategory.familyId
            });
            const stubRepositoryFindById = sinon
                .stub(dbRepository, 'findById')
                .returns(correspondingCategory);
            const fetchedCategory = findById({
                id: '4b309f8a13ec1c8f37a9e7c2',
                categoryRepository: dbRepository
            });

            expect(stubRepositoryFindById.calledOnce).to.be.true;
            sinon.assert.calledWith(
                stubRepositoryFindById,
                '4b309f8a13ec1c8f37a9e7c2'
            );
            expect(fetchedCategory).to.eql(correspondingCategory);
        });
    });

    describe('Fetch all categories', () => {
        it('should fetch all the categories succesfully', () => {
            const stubRepositoryFetchAll = sinon
                .stub(dbRepository, 'findAll')
                .returns({
                    categories: [
                        { '_id': '4b309f8a13ec1c8f37a9e7c1', 'name': 'name1' },
                        { '_id': '4b309f8a13ec1c8f37a9e7c2', 'name': 'name2' }
                    ]
                });
            const categories = findAll({
                params: {},
                categoryRepository: dbRepository
            });

            expect(stubRepositoryFetchAll.calledOnce).to.be.true;
            expect(categories).to.eql({
                categories: [
                    { '_id': '4b309f8a13ec1c8f37a9e7c1', 'name': 'name1' },
                    { '_id': '4b309f8a13ec1c8f37a9e7c2', 'name': 'name2' }
                ]
            });
        });
    });

    describe('Add new category', () => {
        it('should add a new category succesfully', () => {
            const stubValue = {
                name: faker.name.findName(),
                icon: faker.lorem.sentence(),
                color: faker.lorem.sentence(),
                userId: faker.datatype.uuid(),
                familyId: faker.datatype.uuid()
            };
            const persistedCategory = category({
                name: stubValue.name,
                icon: stubValue.icon,
                color: stubValue.color,
                userId: stubValue.userId,
                familyId: stubValue.familyId
            });
            const stubRepositoryAdd = sinon
                .stub(dbRepository, 'add')
                .returns(persistedCategory);
            const newCategory = addCategory({
                name: stubValue.name,
                icon: stubValue.icon,
                color: stubValue.color,
                userId: stubValue.userId,
                familyId: stubValue.familyId,
                categoryRepository: dbRepository
            });

            expect(stubRepositoryAdd.calledOnce).to.be.true;
            expect(newCategory.getName()).equals(stubValue.name);
            expect(newCategory.getIcon()).equals(stubValue.icon);
            expect(newCategory.getColor()).equals(stubValue.color);
            expect(newCategory.getUserId()).equals(stubValue.userId);
            expect(newCategory.getFamilyId()).equals(stubValue.familyId);
        });
    });
});