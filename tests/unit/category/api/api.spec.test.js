import sinon from 'sinon';
import request from 'request';
import chai from 'chai';

import categories from '../../fixtures/categories';
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

    describe('GET /api/v1/categories', () => {
        it('should return all categories', (done) => {
            getStub.yields(
                null,
                categories.all.success.res,
                JSON.stringify(categories.all.success.body)
            );

            request.get(`${base}/api/v1/category`, (err, res, body) => {
                res.statusCode.should.eql(200);
                res.headers['content-type'].should.contain('application/json');

                body = JSON.parse(body);
                body.categories.length.should.eql(2);
                body.categories[0].name.should.eql('name1');
                body.categories[0].icon.should.eql('icon1');
                body.categories[0].color.should.eql('#000000');

                done();
            });
        });
    });

    describe('GET /api/v1/category/:id', () => {
        it('should return a specific category', (done) => {
            const obj = categories.single.success;

            getStub.yields(null, obj.res, JSON.stringify(obj.body));

            request.get(
                `${base}/api/v1/categories/4b309f8a13ec1c8f37a9e7c1`,
                (err, res, body) => {
                    res.statusCode.should.equal(200);
                    res.headers['content-type'].should.contain('application/json');

                    body = JSON.parse(body);
                    body.name.should.eql('name1');
                    body.icon.should.eql('icon1');
                    body.color.should.eql('#000000');

                    done();
                }
            );
        });
        it('should throw an error if the category does not exist', (done) => {
            const obj = categories.single.failure;

            getStub.yields(null, obj.res, JSON.stringify(obj.body));

            request.get(
                `${base}/api/v1/categories/3a1b5e4d90c2f7d6a38e9c5b`,
                (err, res, body) => {
                    res.statusCode.should.equal(404);
                    res.headers['content-type'].should.contain('application/json');

                    body = JSON.parse(body);
                    body.status.should.eql('404');
                    body.message.should.eql('No category found');

                    done();
                }
            );
        });
    });

    describe('POST /api/v1/categories', () => {
        it('should return the category that was added', (done) => {
            const options = {
                body: {
                    name: 'name3',
                    icon: 'icon3',
                    color: '#222222',
                    familyId: '2c8d06eaa5012bf8734e6b47'
                },
                json: true,
                url: `${base}/api/v1/categories`
            };
            const obj = categories.add.success;

            postStub.yields(null, obj.res, JSON.stringify(obj.body));

            request.post(options, (err, res, body) => {
                res.statusCode.should.equal(200);
                res.headers['content-type'].should.contain('application/json');

                body = JSON.parse(body);
                body.name.should.eql('name3');
                body.icon.should.eql('icon3');
                body.color.should.eql('#222222');

                done();
            });
        });
    });

    describe('PUT /api/v1/categories', () => {
        it('should return the category that was updated', (done) => {
            const options = {
                body: {
                    name: 'name4',
                    icon: 'icon4',
                    color: '#333333'
                },
                json: true,
                url: `${base}/api/v1/categories/4b309f8a13ec1c8f37a9e7c3`
            };
            const obj = categories.update.success;

            putStub.yields(null, obj.res, JSON.stringify(obj.body));

            request.put(options, (err, res, body) => {
                res.statusCode.should.equal(200);
                res.headers['content-type'].should.contain('application/json');

                body = JSON.parse(body);
                body.name.should.eql('name4');
                body.icon.should.eql('icon4');
                body.color.should.eql('#333333');

                done();
            });
        });
    });

    describe('DELETE /api/v1/categories', () => {
        it('should return the category that was deleted', (done) => {
            const options = {
                url: `${base}/api/v1/categories/4b309f8a13ec1c8f37a9e7c3`
            };
            const obj = categories.delete.success;

            deleteStub.yields(null, obj.res, JSON.stringify(obj.body));

            request.delete(options, (err, res, body) => {
                res.statusCode.should.equal(200);
                res.headers['content-type'].should.contain('application/json');

                body = JSON.parse(body);
                body.name.should.eql('name3');
                body.icon.should.eql('icon3');
                body.color.should.eql('#222222');

                done();
            });
        });
    });
});
