import chai from 'chai';
import sinon from 'sinon';
import faker from 'faker';

import budget from '../../../../src/entities/budget';
import addBudget from '../../../../application/use_cases/budget/add';
import findAll from '../../../../application/use_cases/budget/findAll';
import findById from '../../../../application/use_cases/budget/findById';
import budgetDbRepository from '../../../../application/repositories/budgetDbRepository';

const { expect } = chai;

let dbRepository = null;

describe('Use cases', () => {
    beforeEach(() => {
        dbRepository = budgetDbRepository();
    });

    describe('Fetch a specific budget', () => {
        it('should fetch a budget by id', () => {
            const stubBudget = {
                budgetLimit: faker.datatype.number({ min: 1, max: 1000 }),
                categoryId: faker.datatype.uuid(),
                userId: faker.datatype.uuid(),
                familyId: faker.datatype.uuid()
            };
            const correspondingBudget = budget({
                budgetLimit: stubBudget.budgetLimit,
                categoryId: stubBudget.categoryId,
                userId: stubBudget.userId,
                familyId: stubBudget.familyId
            });
            const stubRepositoryFindById = sinon
                .stub(dbRepository, 'findById')
                .returns(correspondingBudget);
            const fetchedBudget = findById({
                id: '4b309f8a13ec1c8f37a9e7c2',
                budgetRepository: dbRepository
            });

            expect(stubRepositoryFindById.calledOnce).to.be.true;
            sinon.assert.calledWith(
                stubRepositoryFindById,
                '4b309f8a13ec1c8f37a9e7c2'
            );
            expect(fetchedBudget).to.eql(correspondingBudget);
        });
    });

    describe('Fetch all budgets', () => {
        it('should fetch all the budgets succesfully', () => {
            const stubRepositoryFetchAll = sinon
                .stub(dbRepository, 'findAll')
                .returns({
                    budgets: [
                        { '_id': '4b309f8a13ec1c8f37a9e7c1', 'budgetLimit': 100 },
                        { '_id': '4b309f8a13ec1c8f37a9e7c2', 'budgetLimit': 200 }
                    ]
                });
            const budgets = findAll({
                params: {},
                budgetRepository: dbRepository
            });

            expect(stubRepositoryFetchAll.calledOnce).to.be.true;
            expect(budgets).to.eql({
                budgets: [
                    { '_id': '4b309f8a13ec1c8f37a9e7c1', 'budgetLimit': 100 },
                    { '_id': '4b309f8a13ec1c8f37a9e7c2', 'budgetLimit': 200 }
                ]
            });
        });
    });

    describe('Add new budget', () => {
        it('should add a new budget succesfully', () => {
            const stubValue = {
                budgetLimit: faker.datatype.number({ min: 1, max: 1000 }),
                categoryId: faker.datatype.uuid(),
                userId: faker.datatype.uuid(),
                familyId: faker.datatype.uuid()
            };
            const persistedBudget = budget({
                budgetLimit: stubValue.budgetLimit,
                categoryId: stubValue.categoryId,
                userId: stubValue.userId,
                familyId: stubValue.familyId
            });
            const stubRepositoryAdd = sinon
                .stub(dbRepository, 'add')
                .returns(persistedBudget);
            const newBudget = addBudget({
                budgetLimit: stubValue.budgetLimit,
                categoryId: stubValue.categoryId,
                userId: stubValue.userId,
                familyId: stubValue.familyId,
                budgetRepository: dbRepository
            });

            expect(stubRepositoryAdd.calledOnce).to.be.true;
            expect(newBudget.getBudgetLimit()).equals(stubValue.budgetLimit);
            expect(newBudget.getCategoryId()).equals(stubValue.categoryId);
            expect(newBudget.getUserId()).equals(stubValue.userId);
            expect(newBudget.getFamilyId()).equals(stubValue.familyId);
        });
    });
});