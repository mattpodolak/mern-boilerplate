const Todo = require('../models/todo');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
// const { should } = require("chai");

// Configure chai
chai.use(chaiHttp);
var should = chai.should();

//Our parent block
describe('Todos', () => {

    //test POST route
    describe('/POST todo', () => {
        let todo = {
            action: "Test todo",
        }
        it('it should POST a todo', (done) => {
            chai.request(app)
                .post('/api/todos')
                .send(todo)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('action').eql(todo.action);
                    done();
                });
        });
    });

    //test specific GET route
    describe('/GET todos', () => {
        it('it should GET a specific todo', (done) => {
            let todo = new Todo({action: "Test todo"})
            todo.save((err, todo) => {
                chai.request(app)
                    .get('/api/todos/' + todo.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id');
                        res.body.should.have.property('action').eql(todo.action);
                        done();
                    });
            });      
        }); 
        it('it should GET at least one todo', (done) => {
            chai.request(app)
                .get('/api/todos')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.gte(1);
                    done();
                });
        });
    });

    //test DELETE route
    describe('/DELETE todo', () => {
        it('it should DELETE a specific todo', (done) => {
            let todo = new Todo({action: "Test todo"})
            todo.save((err, todo) => {
                chai.request(app)
                    .delete('/api/todos/' + todo.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id');
                        res.body.should.have.property('action').eql(todo.action);
                        done();
                    });
            });
        });        
    });

    //test edge cases
    describe('Edge cases', () => {
        it('it should not POST a todo with an incorrect field', (done) => {
            let todo = {
                actio: "Test todo",
            }
            chai.request(app)
                .post('/api/todos')
                .send(todo)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql("The input field is empty");
                    done();
                });
        });
        it('it should not GET a todo that doesnt exist', (done) => {
            chai.request(app)
                .get('/api/todos/555555555555555555555555')
                .end((err, res) => {
                    should.equal(res.body, null)
                    done();
                });     
        });
        it('it should not DELETE a todo that doesnt exist', (done) => {
            chai.request(app)
                .delete('/api/todos/555555555555555555555555')
                .end((err, res) => {
                    should.equal(res.body, null)
                    done();
                });
        });
        //test GET route with an empty database
        describe('/GET no todos from an empty database', () => {
            before((done) => { //Before the test we empty the database
                Todo.deleteMany({}, (err) => { 
                done();           
                });        
            });
            it('it should GET no todos from an empty database', (done) => {
                chai.request(app)
                    .get('/api/todos')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(0);
                        done();
                    });
            });
        });       
    });
});