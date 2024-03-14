import chai from 'chai';
import sinon from 'sinon';
import faker from 'faker';

import allowance from '../../../../src/entities/allowance';
import addAllowance from '../../../../application/use_cases/allowance/add';
import findAll from '../../../../application/use_cases/allowance/findAll';
import findById from '../../../../application/use_cases/allowance/findById';
import allowanceDbRepository from '../../../../application/repositories/allowanceDbRepository';

const { expect } = chai;

let dbRepository = null;

describe('Use cases', () => {
    beforeEach(() => {
        dbRepository = allowanceDbRepository();
    });

    describe('Fetch a specific allowance', () => {
        it('should fetch a allowance by id', () => {
            const stubAllowance = {
                amount: faker.datatype.number({ min: 1, max: 1000 }),
                frequency: faker.lorem.sentence(),
                childId: faker.datatype.uuid(),
                userId: faker.datatype.uuid(),
                familyId: faker.datatype.uuid()
            };
            const correspondingAllowance = allowance({
                amount: stubAllowance.amount,
                frequency: stubAllowance.frequency,
                childId: stubAllowance.childId,
                userId: stubAllowance.userId,
                familyId: stubAllowance.familyId
            });
            const stubRepositoryFindById = sinon
                .stub(dbRepository, 'findById')
                .returns(correspondingAllowance);
            const fetchedAllowance = findById({
                id: '4b309f8a13ec1c8f37a9e7c2',
                allowanceRepository: dbRepository
            });

            expect(stubRepositoryFindById.calledOnce).to.be.true;
            sinon.assert.calledWith(
                stubRepositoryFindById,
                '4b309f8a13ec1c8f37a9e7c2'
            );
            expect(fetchedAllowance).to.eql(correspondingAllowance);
        });
    });

    describe('Fetch all allowances', () => {
        it('should fetch all the allowances succesfully', () => {
            const stubRepositoryFetchAll = sinon
                .stub(dbRepository, 'findAll')
                .returns({
                    allowances: [
                        { '_id': '4b309f8a13ec1c8f37a9e7c1', 'amount': 100 },
                        { '_id': '4b309f8a13ec1c8f37a9e7c2', 'amount': 200 }
                    ]
                });
            const allowances = findAll({
                params: {},
                allowanceRepository: dbRepository
            });

            expect(stubRepositoryFetchAll.calledOnce).to.be.true;
            expect(allowances).to.eql({
                allowances: [
                    { '_id': '4b309f8a13ec1c8f37a9e7c1', 'amount': 100 },
                    { '_id': '4b309f8a13ec1c8f37a9e7c2', 'amount': 200 }
                ]
            });
        });
    });

    describe('Add new allowance', () => {
        it('should add a new allowance succesfully', () => {
            const stubValue = {
                amount: faker.datatype.number({ min: 1, max: 1000 }),
                frequency: faker.lorem.sentence(),
                childId: faker.datatype.uuid(),
                userId: faker.datatype.uuid(),
                familyId: faker.datatype.uuid()
            };
            const persistedAllowance = allowance({
                amount: stubValue.amount,
                frequency: stubValue.frequency,
                childId: stubValue.childId,
                userId: stubValue.userId,
                familyId: stubValue.familyId
            });
            const stubRepositoryAdd = sinon
                .stub(dbRepository, 'add')
                .returns(persistedAllowance);
            const newAllowance = addAllowance({
                amount: stubValue.amount,
                frequency: stubValue.frequency,
                childId: stubValue.childId,
                userId: stubValue.userId,
                familyId: stubValue.familyId,
                allowanceRepository: dbRepository
            });

            expect(stubRepositoryAdd.calledOnce).to.be.true;
            expect(newAllowance.getAmount()).equals(stubValue.amount);
            expect(newAllowance.getFrequency()).equals(stubValue.frequency);
            expect(newAllowance.getChildId()).equals(stubValue.childId);
            expect(newAllowance.getUserId()).equals(stubValue.userId);
            expect(newAllowance.getFamilyId()).equals(stubValue.familyId);
        });
    });
});