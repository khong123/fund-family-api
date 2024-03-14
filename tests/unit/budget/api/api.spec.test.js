import sinon from 'sinon';
import request from 'request';
import chai from 'chai';

import budgets from '../../fixtures/budgets';
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

    describe('GET /api/v1/budgets', () => {
        it('should return all budgets', (done) => {
            getStub.yields(
                null,
                budgets.all.success.res,
                JSON.stringify(budgets.all.success.body)
            );

            request.get(`${base}/api/v1/budget`, (err, res, body) => {
                res.statusCode.should.eql(200);
                res.headers['content-type'].should.contain('application/json');

                body = JSON.parse(body);
                body.budgets.length.should.eql(2);
                body.budgets[0].budgetLimit.should.eql(100);

                done();
            });
        });
    });

    describe('GET /api/v1/budget/:id', () => {
        it('should return a specific budget', (done) => {
            const obj = budgets.single.success;

            getStub.yields(null, obj.res, JSON.stringify(obj.body));

            request.get(
                `${base}/api/v1/budgets/4b309f8a13ec1c8f37a9e7c1`,
                (err, res, body) => {
                    res.statusCode.should.equal(200);
                    res.headers['content-type'].should.contain('application/json');

                    body = JSON.parse(body);
                    body.budgetLimit.should.eql(100);

                    done();
                }
            );
        });
        it('should throw an error if the budget does not exist', (done) => {
            const obj = budgets.single.failure;

            getStub.yields(null, obj.res, JSON.stringify(obj.body));

            request.get(
                `${base}/api/v1/budgets/3a1b5e4d90c2f7d6a38e9c5b`,
                (err, res, body) => {
                    res.statusCode.should.equal(404);
                    res.headers['content-type'].should.contain('application/json');

                    body = JSON.parse(body);
                    body.status.should.eql('404');
                    body.message.should.eql('No budget found');

                    done();
                }
            );
        });
    });

    describe('POST /api/v1/budgets', () => {
        it('should return the budget that was added', (done) => {
            const options = {
                body: {
                    budgetLimit: 300,
                    categoryId: 'aed6f37b8052c1a98d49e0c2',
                    familyId: '2c8d06eaa5012bf8734e6b47'
                },
                json: true,
                url: `${base}/api/v1/budgets`
            };
            const obj = budgets.add.success;

            postStub.yields(null, obj.res, JSON.stringify(obj.body));

            request.post(options, (err, res, body) => {
                res.statusCode.should.equal(200);
                res.headers['content-type'].should.contain('application/json');

                body = JSON.parse(body);
                body.budgetLimit.should.eql(300);

                done();
            });
        });
    });

    describe('PUT /api/v1/budgets', () => {
        it('should return the budget that was updated', (done) => {
            const options = {
                body: {
                    budgetLimit: 400,
                    categoryId: 'aed6f37b8052c1a98d49e0c2'
                },
                json: true,
                url: `${base}/api/v1/budgets/4b309f8a13ec1c8f37a9e7c3`
            };
            const obj = budgets.update.success;

            putStub.yields(null, obj.res, JSON.stringify(obj.body));

            request.put(options, (err, res, body) => {
                res.statusCode.should.equal(200);
                res.headers['content-type'].should.contain('application/json');

                body = JSON.parse(body);
                body.budgetLimit.should.eql(400);

                done();
            });
        });
    });

    describe('DELETE /api/v1/budgets', () => {
        it('should return the budget that was deleted', (done) => {
            const options = {
                url: `${base}/api/v1/budgets/4b309f8a13ec1c8f37a9e7c3`
            };
            const obj = budgets.delete.success;

            deleteStub.yields(null, obj.res, JSON.stringify(obj.body));

            request.delete(options, (err, res, body) => {
                res.statusCode.should.equal(200);
                res.headers['content-type'].should.contain('application/json');

                body = JSON.parse(body);
                body.budgetLimit.should.eql(300);

                done();
            });
        });
    });
});
