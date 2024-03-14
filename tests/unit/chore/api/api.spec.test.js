import sinon from 'sinon';
import request from 'request';
import chai from 'chai';

import chores from '../../fixtures/chores';
const should = chai.should();

const base = 'http://localhost:2000';

describe('API', () => {
    let getStub = null;
    let postStub = null;
    let putStub = null;
    let deleteStub = null;

    beforeEach(() => {
        getStub = sinon.stub(request, 'get');
        postStub = sinon.stub(request, 'post');
        putStub = sinon.stub(request, 'put');
        deleteStub = sinon.stub(request, 'delete');
    });
    afterEach(() => {
        request.get.restore();
        request.post.restore();
        request.put.restore();
        request.delete.restore();
    });

    describe('GET /api/v1/chores', () => {
        it('should return all chores', (done) => {
            getStub.yields(
                null,
                chores.all.success.res,
                JSON.stringify(chores.all.success.body)
            );

            request.get(`${base}/api/v1/chore`, (err, res, body) => {
                res.statusCode.should.eql(200);
                res.headers['content-type'].should.contain('application/json');

                body = JSON.parse(body);
                body.chores.length.should.eql(2);
                body.chores[0].description.should.eql('description1');
                body.chores[0].rewardType.should.eql('points');
                body.chores[0].rewardValue.should.eql(100);
                body.chores[0].deadlineAt.should.eql('2024-01-01T08:00:00.000Z');
                body.chores[0].completed.should.eql(false);

                done();
            });
        });
    });

    describe('GET /api/v1/chore/:id', () => {
        it('should return a specific chore', (done) => {
            const obj = chores.single.success;

            getStub.yields(null, obj.res, JSON.stringify(obj.body));

            request.get(
                `${base}/api/v1/chores/4b309f8a13ec1c8f37a9e7c1`,
                (err, res, body) => {
                    res.statusCode.should.equal(200);
                    res.headers['content-type'].should.contain('application/json');

                    body = JSON.parse(body);
                    body.description.should.eql('description1');
                    body.rewardType.should.eql('points');
                    body.rewardValue.should.eql(100);
                    body.deadlineAt.should.eql('2024-01-01T08:00:00.000Z');
                    body.completed.should.eql(false);

                    done();
                }
            );
        });
        it('should throw an error if the chore does not exist', (done) => {
            const obj = chores.single.failure;

            getStub.yields(null, obj.res, JSON.stringify(obj.body));

            request.get(
                `${base}/api/v1/chores/3a1b5e4d90c2f7d6a38e9c5b`,
                (err, res, body) => {
                    res.statusCode.should.equal(404);
                    res.headers['content-type'].should.contain('application/json');

                    body = JSON.parse(body);
                    body.status.should.eql('404');
                    body.message.should.eql('No chore found');

                    done();
                }
            );
        });
    });

    describe('POST /api/v1/chores', () => {
        it('should return the chore that was added', (done) => {
            const options = {
                body: {
                    description: 'description3',
                    rewardType: 'points',
                    rewardValue: 300,
                    deadlineAt: '2024-01-03T08:00:00.000Z',
                    completed: false,
                    childId: 'c80f24e7a9b351dc2e6b6f58',
                    familyId: '2c8d06eaa5012bf8734e6b47'
                },
                json: true,
                url: `${base}/api/v1/chores`
            };
            const obj = chores.add.success;

            postStub.yields(null, obj.res, JSON.stringify(obj.body));

            request.post(options, (err, res, body) => {
                res.statusCode.should.equal(200);
                res.headers['content-type'].should.contain('application/json');

                body = JSON.parse(body);
                body.description.should.eql('description3');
                body.rewardType.should.eql('points');
                body.rewardValue.should.eql(300);
                body.deadlineAt.should.eql('2024-01-03T08:00:00.000Z');
                body.completed.should.eql(false);

                done();
            });
        });
    });

    describe('PUT /api/v1/chores', () => {
        it('should return the chore that was updated', (done) => {
            const options = {
                body: {
                    description: 'description4',
                    rewardType: 'points',
                    rewardValue: 400,
                    deadlineAt: '2024-01-04T08:00:00.000Z',
                    completed: false
                },
                json: true,
                url: `${base}/api/v1/chores/4b309f8a13ec1c8f37a9e7c3`
            };
            const obj = chores.update.success;

            putStub.yields(null, obj.res, JSON.stringify(obj.body));

            request.put(options, (err, res, body) => {
                res.statusCode.should.equal(200);
                res.headers['content-type'].should.contain('application/json');

                body = JSON.parse(body);
                body.description.should.eql('description4');
                body.rewardType.should.eql('points');
                body.rewardValue.should.eql(400);
                body.deadlineAt.should.eql('2024-01-04T08:00:00.000Z');
                body.completed.should.eql(false);

                done();
            });
        });
    });

    describe('DELETE /api/v1/chores', () => {
        it('should return the chore that was deleted', (done) => {
            const options = {
                url: `${base}/api/v1/chores/4b309f8a13ec1c8f37a9e7c3`
            };
            const obj = chores.delete.success;

            deleteStub.yields(null, obj.res, JSON.stringify(obj.body));

            request.delete(options, (err, res, body) => {
                res.statusCode.should.equal(200);
                res.headers['content-type'].should.contain('application/json');

                body = JSON.parse(body);
                body.description.should.eql('description3');
                body.rewardType.should.eql('points');
                body.rewardValue.should.eql(300);
                body.deadlineAt.should.eql('2024-01-03T08:00:00.000Z');
                body.completed.should.eql(false);

                done();
            });
        });
    });
});
