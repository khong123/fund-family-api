import sinon from 'sinon';
import request from 'request';
import chai from 'chai';

import allowances from '../../fixtures/allowances';
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

    describe('GET /api/v1/allowances', () => {
        it('should return all allowances', (done) => {
            getStub.yields(
                null,
                allowances.all.success.res,
                JSON.stringify(allowances.all.success.body)
            );

            request.get(`${base}/api/v1/allowances`, (err, res, body) => {
                res.statusCode.should.eql(200);
                res.headers['content-type'].should.contain('application/json');

                body = JSON.parse(body);
                body.allowances.length.should.eql(2);
                body.allowances[0].amount.should.eql(100);
                body.allowances[0].frequency.should.eql('weekly');

                done();
            });
        });
    });

    describe('GET /api/v1/allowances/:id', () => {
        it('should return a specific allowance', (done) => {
            const obj = allowances.single.success;

            getStub.yields(null, obj.res, JSON.stringify(obj.body));

            request.get(
                `${base}/api/v1/allowances/4b309f8a13ec1c8f37a9e7c1`,
                (err, res, body) => {
                    res.statusCode.should.equal(200);
                    res.headers['content-type'].should.contain('application/json');

                    body = JSON.parse(body);
                    body.amount.should.eql(100);
                    body.frequency.should.eql('weekly');

                    done();
                }
            );
        });
        it('should throw an error if the allowance does not exist', (done) => {
            const obj = allowances.single.failure;

            getStub.yields(null, obj.res, JSON.stringify(obj.body));

            request.get(
                `${base}/api/v1/allowances/3a1b5e4d90c2f7d6a38e9c5b`,
                (err, res, body) => {
                    res.statusCode.should.equal(404);
                    res.headers['content-type'].should.contain('application/json');

                    body = JSON.parse(body);
                    body.status.should.eql('404');
                    body.message.should.eql('No allowance found');

                    done();
                }
            );
        });
    });

    describe('POST /api/v1/allowances', () => {
        it('should return the allowance that was added', (done) => {
            const options = {
                body: {
                    amount: 300,
                    frequency: 'weekly',
                    childId: '7e49d1f5c6b02a3d81ec4a70',
                    familyId: '2c8d06eaa5012bf8734e6b47'
                },
                json: true,
                url: `${base}/api/v1/allowances`
            };
            const obj = allowances.add.success;

            postStub.yields(null, obj.res, JSON.stringify(obj.body));

            request.post(options, (err, res, body) => {
                res.statusCode.should.equal(200);
                res.headers['content-type'].should.contain('application/json');

                body = JSON.parse(body);
                body.amount.should.eql(300);
                body.frequency.should.eql('weekly');

                done();
            });
        });
    });

    describe('PUT /api/v1/allowances', () => {
        it('should return the allowance that was updated', (done) => {
            const options = {
                body: {
                    amount: 400,
                    frequency: 'weekly'
                },
                json: true,
                url: `${base}/api/v1/allowances/4b309f8a13ec1c8f37a9e7c3`
            };
            const obj = allowances.update.success;

            putStub.yields(null, obj.res, JSON.stringify(obj.body));

            request.put(options, (err, res, body) => {
                res.statusCode.should.equal(200);
                res.headers['content-type'].should.contain('application/json');

                body = JSON.parse(body);
                body.amount.should.eql(400);
                body.frequency.should.eql('weekly');

                done();
            });
        });
    });

    describe('DELETE /api/v1/allowances', () => {
        it('should return the allowance that was deleted', (done) => {
            const options = {
                url: `${base}/api/v1/allowances/4b309f8a13ec1c8f37a9e7c3`
            };
            const obj = allowances.delete.success;

            deleteStub.yields(null, obj.res, JSON.stringify(obj.body));

            request.delete(options, (err, res, body) => {
                res.statusCode.should.equal(200);
                res.headers['content-type'].should.contain('application/json');

                body = JSON.parse(body);
                body.amount.should.eql(300);
                body.frequency.should.eql('weekly');

                done();
            });
        });
    });
});
