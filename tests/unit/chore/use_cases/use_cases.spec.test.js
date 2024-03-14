import chai from 'chai';
import sinon from 'sinon';
import faker from 'faker';

import chore from '../../../../src/entities/chore';
import addChore from '../../../../application/use_cases/chore/add';
import findAll from '../../../../application/use_cases/chore/findAll';
import findById from '../../../../application/use_cases/chore/findById';
import choreDbRepository from '../../../../application/repositories/choreDbRepository';

const { expect } = chai;

let dbRepository = null;

describe('Use cases', () => {
    beforeEach(() => {
        dbRepository = choreDbRepository();
    });

    describe('Fetch a specific chore', () => {
        it('should fetch a chore by id', () => {
            const stubChore = {
                description: faker.lorem.sentence(),
                rewardType: faker.lorem.sentence(),
                rewardValue: faker.datatype.number({ min: 1, max: 1000 }),
                deadlineAt: faker.date.past(),
                completed: faker.datatype.boolean(),
                childId: faker.datatype.uuid(),
                userId: faker.datatype.uuid(),
                familyId: faker.datatype.uuid()
            };
            const correspondingChore = chore({
                description: stubChore.description,
                rewardType: stubChore.rewardType,
                rewardValue: stubChore.rewardValue,
                deadlineAt: stubChore.deadlineAt,
                completed: stubChore.completed,
                childId: stubChore.childId,
                userId: stubChore.userId,
                familyId: stubChore.familyId
            });
            const stubRepositoryFindById = sinon
                .stub(dbRepository, 'findById')
                .returns(correspondingChore);
            const fetchedChore = findById({
                id: '4b309f8a13ec1c8f37a9e7c2',
                choreRepository: dbRepository
            });

            expect(stubRepositoryFindById.calledOnce).to.be.true;
            sinon.assert.calledWith(
                stubRepositoryFindById,
                '4b309f8a13ec1c8f37a9e7c2'
            );
            expect(fetchedChore).to.eql(correspondingChore);
        });
    });

    describe('Fetch all chores', () => {
        it('should fetch all the chores succesfully', () => {
            const stubRepositoryFetchAll = sinon
                .stub(dbRepository, 'findAll')
                .returns({
                    chores: [
                        { '_id': '4b309f8a13ec1c8f37a9e7c1', 'description': 'description1' },
                        { '_id': '4b309f8a13ec1c8f37a9e7c2', 'description': 'description2' }
                    ]
                });
            const chores = findAll({
                params: {},
                choreRepository: dbRepository
            });

            expect(stubRepositoryFetchAll.calledOnce).to.be.true;
            expect(chores).to.eql({
                chores: [
                    { '_id': '4b309f8a13ec1c8f37a9e7c1', 'description': 'description1' },
                    { '_id': '4b309f8a13ec1c8f37a9e7c2', 'description': 'description2' }
                ]
            });
        });
    });

    describe('Add new chore', () => {
        it('should add a new chore succesfully', () => {
            const stubValue = {
                description: faker.lorem.sentence(),
                rewardType: faker.lorem.sentence(),
                rewardValue: faker.datatype.number({ min: 1, max: 1000 }),
                deadlineAt: faker.date.past(),
                completed: faker.datatype.boolean(),
                childId: faker.datatype.uuid(),
                userId: faker.datatype.uuid(),
                familyId: faker.datatype.uuid()
            };
            const persistedChore = chore({
                description: stubValue.description,
                rewardType: stubValue.rewardType,
                rewardValue: stubValue.rewardValue,
                deadlineAt: stubValue.deadlineAt,
                completed: stubValue.completed,
                childId: stubValue.childId,
                userId: stubValue.userId,
                familyId: stubValue.familyId
            });
            const stubRepositoryAdd = sinon
                .stub(dbRepository, 'add')
                .returns(persistedChore);
            const newChore = addChore({
                description: stubValue.description,
                rewardType: stubValue.rewardType,
                rewardValue: stubValue.rewardValue,
                deadlineAt: stubValue.deadlineAt,
                completed: stubValue.completed,
                childId: stubValue.childId,
                userId: stubValue.userId,
                familyId: stubValue.familyId,
                choreRepository: dbRepository
            });

            expect(stubRepositoryAdd.calledOnce).to.be.true;
            expect(newChore.getDescription()).equals(stubValue.description);
            expect(newChore.getRewardType()).equals(stubValue.rewardType);
            expect(newChore.getRewardValue()).equals(stubValue.rewardValue);
            expect(newChore.getDeadlineAt()).equals(stubValue.deadlineAt);
            expect(newChore.getCompleted()).equals(stubValue.completed);
            expect(newChore.getChildId()).equals(stubValue.childId);
            expect(newChore.getUserId()).equals(stubValue.userId);
            expect(newChore.getFamilyId()).equals(stubValue.familyId);
        });
    });
});