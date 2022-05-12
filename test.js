const { expect, request } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./server')
let should = chai.should()
chai.use(chaiHttp);

describe('login', () => {
    describe('Post /login', () => {
        it('should login the user', (done) => {
            chai
                .request(app)
                .post('/login').set('content-type', 'application/json').send({ "username": "bogrowgane0@wordpress.org", "password": "fHHZIf" })
                .redirects(0).end((err, res)=>{
                    expect(res.header[`location`]).to.equal(`/`)
                     done()
                 })
        });
    });
});


describe('login', () => {
    describe('Post /login', () => {
        it('should not login the user', (done) => {
            chai
                .request(app)
                .post('/login').set('content-type', 'application/json').send({ "username": "1230@wordpress.org", "password": "fHHZIf" })
                .redirects(0).end((err, res)=>{
                   expect(res.header[`location`]).to.equal(`/login`)
                    done()
                })
        });
    });
});