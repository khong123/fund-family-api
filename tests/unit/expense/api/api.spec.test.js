import sinon from 'sinon';
import request from 'request';
import chai from 'chai';

import expenses from '../../fixtures/expenses';
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

    describe('GET /api/v1/expenses', () => {
        it('should return all expenses', (done) => {
            getStub.yields(
                null,
                expenses.all.success.res,
                JSON.stringify(expenses.all.success.body)
            );

            request.get(`${base}/api/v1/expense`, (err, res, body) => {
                res.statusCode.should.eql(200);
                res.headers['content-type'].should.contain('application/json');

                body = JSON.parse(body);
                body.expenses.length.should.eql(2);
                body.expenses[0].amount.should.eql(100);
                body.expenses[0].description.should.eql('description1');
                body.expenses[0].recordedAt.should.eql('2024-01-01T08:00:00.000Z');

                done();
            });
        });
    });

    describe('GET /api/v1/expense/:id', () => {
        it('should return a specific expense', (done) => {
            const obj = expenses.single.success;

            getStub.yields(null, obj.res, JSON.stringify(obj.body));

            request.get(
                `${base}/api/v1/expenses/4b309f8a13ec1c8f37a9e7c1`,
                (err, res, body) => {
                    res.statusCode.should.equal(200);
                    res.headers['content-type'].should.contain('application/json');

                    body = JSON.parse(body);
                    body.amount.should.eql(100);
                    body.description.should.eql('description1');
                    body.recordedAt.should.eql('2024-01-01T08:00:00.000Z');

                    done();
                }
            );
        });
        it('should throw an error if the expense does not exist', (done) => {
            const obj = expenses.single.failure;

            getStub.yields(null, obj.res, JSON.stringify(obj.body));

            request.get(
                `${base}/api/v1/expenses/3a1b5e4d90c2f7d6a38e9c5b`,
                (err, res, body) => {
                    res.statusCode.should.equal(404);
                    res.headers['content-type'].should.contain('application/json');

                    body = JSON.parse(body);
                    body.status.should.eql('404');
                    body.message.should.eql('No expense found');

                    done();
                }
            );
        });
    });

    describe('POST /api/v1/expenses', () => {
        it('should return the expense that was added', (done) => {
            const options = {
                body: {
                    amount: 300,
                    description: 'description3',
                    recordedAt: '2024-01-03T08:00:00.000Z',
                    familyId: '2c8d06eaa5012bf8734e6b47'
                },
                json: true,
                url: `${base}/api/v1/expenses`
            };
            const obj = expenses.add.success;

            postStub.yields(null, obj.res, JSON.stringify(obj.body));

            request.post(options, (err, res, body) => {
                res.statusCode.should.equal(200);
                res.headers['content-type'].should.contain('application/json');

                body = JSON.parse(body);
                body.amount.should.eql(300);
                body.description.should.eql('description3');
                body.recordedAt.should.eql('2024-01-03T08:00:00.000Z');

                done();
            });
        });
    });

    describe('PUT /api/v1/expenses', () => {
        it('should return the expense that was updated', (done) => {
            const options = {
                body: {
                    amount: 400,
                    description: 'description4',
                    recordedAt: '2024-01-04T08:00:00.000Z'
                },
                json: true,
                url: `${base}/api/v1/expenses/4b309f8a13ec1c8f37a9e7c3`
            };
            const obj = expenses.update.success;

            putStub.yields(null, obj.res, JSON.stringify(obj.body));

            request.put(options, (err, res, body) => {
                res.statusCode.should.equal(200);
                res.headers['content-type'].should.contain('application/json');

                body = JSON.parse(body);
                body.amount.should.eql(400);
                body.description.should.eql('description4');
                body.recordedAt.should.eql('2024-01-04T08:00:00.000Z');

                done();
            });
        });
    });

    describe('DELETE /api/v1/expenses', () => {
        it('should return the expense that was deleted', (done) => {
            const options = {
                url: `${base}/api/v1/expenses/4b309f8a13ec1c8f37a9e7c3`
            };
            const obj = expenses.delete.success;

            deleteStub.yields(null, obj.res, JSON.stringify(obj.body));

            request.delete(options, (err, res, body) => {
                res.statusCode.should.equal(200);
                res.headers['content-type'].should.contain('application/json');

                body = JSON.parse(body);
                body.amount.should.eql(300);
                body.description.should.eql('description3');
                body.recordedAt.should.eql('2024-01-03T08:00:00.000Z');

                done();
            });
        });
    });
});
