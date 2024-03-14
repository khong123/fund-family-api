import chai from 'chai';
import sinon from 'sinon';
import faker from 'faker';

import expense from '../../../../src/entities/expense';
import addExpense from '../../../../application/use_cases/expense/add';
import findAll from '../../../../application/use_cases/expense/findAll';
import findById from '../../../../application/use_cases/expense/findById';
import expenseDbRepository from '../../../../application/repositories/expenseDbRepository';

const { expect } = chai;

let dbRepository = null;

describe('Use cases', () => {
    beforeEach(() => {
        dbRepository = expenseDbRepository();
    });

    describe('Fetch a specific expense', () => {
        it('should fetch a expense by id', () => {
            const stubExpense = {
                amount: faker.datatype.number({ min: 1, max: 1000 }),
                description: faker.lorem.sentence(),
                recordedAt: faker.date.past(),
                categoryId: faker.datatype.uuid(),
                userId: faker.datatype.uuid(),
                familyId: faker.datatype.uuid()
            };
            const correspondingExpense = expense({
                amount: stubExpense.amount,
                description: stubExpense.description,
                recordedAt: stubExpense.recordedAt,
                categoryId: stubExpense.categoryId,
                userId: stubExpense.userId,
                familyId: stubExpense.familyId
            });
            const stubRepositoryFindById = sinon
                .stub(dbRepository, 'findById')
                .returns(correspondingExpense);
            const fetchedExpense = findById({
                id: '4b309f8a13ec1c8f37a9e7c2',
                expenseRepository: dbRepository
            });

            expect(stubRepositoryFindById.calledOnce).to.be.true;
            sinon.assert.calledWith(
                stubRepositoryFindById,
                '4b309f8a13ec1c8f37a9e7c2'
            );
            expect(fetchedExpense).to.eql(correspondingExpense);
        });
    });

    describe('Fetch all expenses', () => {
        it('should fetch all the expenses succesfully', () => {
            const stubRepositoryFetchAll = sinon
                .stub(dbRepository, 'findAll')
                .returns({
                    expenses: [
                        { '_id': '4b309f8a13ec1c8f37a9e7c1', 'amount': 100 },
                        { '_id': '4b309f8a13ec1c8f37a9e7c2', 'amount': 200 }
                    ]
                });
            const expenses = findAll({
                params: {},
                expenseRepository: dbRepository
            });

            expect(stubRepositoryFetchAll.calledOnce).to.be.true;
            expect(expenses).to.eql({
                expenses: [
                    { '_id': '4b309f8a13ec1c8f37a9e7c1', 'amount': 100 },
                    { '_id': '4b309f8a13ec1c8f37a9e7c2', 'amount': 200 }
                ]
            });
        });
    });

    describe('Add new expense', () => {
        it('should add a new expense succesfully', () => {
            const stubValue = {
                amount: faker.datatype.number({ min: 1, max: 1000 }),
                description: faker.lorem.sentence(),
                recordedAt: faker.date.past(),
                categoryId: faker.datatype.uuid(),
                userId: faker.datatype.uuid(),
                familyId: faker.datatype.uuid()
            };
            const persistedExpense = expense({
                amount: stubValue.amount,
                description: stubValue.description,
                recordedAt: stubValue.recordedAt,
                categoryId: stubValue.categoryId,
                userId: stubValue.userId,
                familyId: stubValue.familyId
            });
            const stubRepositoryAdd = sinon
                .stub(dbRepository, 'add')
                .returns(persistedExpense);
            const newExpense = addExpense({
                amount: stubValue.amount,
                description: stubValue.description,
                recordedAt: stubValue.recordedAt,
                categoryId: stubValue.categoryId,
                userId: stubValue.userId,
                familyId: stubValue.familyId,
                expenseRepository: dbRepository
            });

            expect(stubRepositoryAdd.calledOnce).to.be.true;
            expect(newExpense.getAmount()).equals(stubValue.amount);
            expect(newExpense.getDescription()).equals(stubValue.description);
            expect(newExpense.getRecordedAt()).equals(stubValue.recordedAt);
            expect(newExpense.getCategoryId()).equals(stubValue.categoryId);
            expect(newExpense.getUserId()).equals(stubValue.userId);
            expect(newExpense.getFamilyId()).equals(stubValue.familyId);
        });
    });
});