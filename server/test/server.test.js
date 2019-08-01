const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

var {app} = require('./../server');
var {Todo} = require('./../models/todo');

const todos = [{
_id: new ObjectID(),
text:'todo 1'
},{
    _id: new ObjectID(),
    text:'todo 2',
    completed: true,
    completedAt: 333
}];
beforeEach((done) => {
    Todo.remove({}).then(() =>{
       return Todo.insertMany(todos);
    }).then(()=> done());
    
});

describe('Post /todos',() =>{
    it('should create a new todo',(done)=>{
        var text ='Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) =>{
                expect(res.body.text).toBe(text);
            })
            .end((err,res) =>{
                if(err){
                    return done(err);
                }
                Todo.find({text}).then((todos) =>{
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });
    

    it('should not create todo with invalid data',(done)=>{       

        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err,res) =>{
                if(err){
                    return done(err);
                }
                Todo.find().then((todos) =>{
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('GET /todos',() =>{
    it('should get all todos',(done) =>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2)
        })
        .end((err,res) =>{
            if(err){
                return done(err);
            }
            done();
        });
    })
});

describe('GET /todos:id',() =>{
    it('should return todo doc',(done)=>{
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text)           
        })
        .end(done);
    });

    it('should return 404 if todo not found',(done)=>{
        var hexId =new ObjectID().toHexString();
        request(app)
        .get(`/todos/${hexId}`)
        .expect(404)        
        .end(done);
    });
    
    it('should return 404 for non-object ids',(done)=>{
        request(app)
        .get(`/todos/1234e`)
        .expect(404)        
        .end(done);
    });

});

describe('DELETE /todos:id',() =>{
    it('should delete todo doc',(done)=>{
        var hexId = todos[0]._id.toHexString();

        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo._id).toBe(hexId)           
        })
        .end((err,res) =>{
            if(err){
                return done(err);
            }
            Todo.findById(hexId).then((todo) =>{
                expect(todo).toBeNull();
                done();
            }).catch((e) => done(e));
        });
    });

    it('should return 404 if todo not found',(done)=>{
        var hexId =new ObjectID().toHexString();
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(404)     
        .expect((res) => {
            expect(res.body.todo).toBeNull
        })   
        .end(done);
    });
    
    it('should return 404 for non-object ids',(done)=>{
        request(app)
        .delete(`/todos/1234e`)
        .expect(404)  
        .expect((res) => {
            expect(res.body.todo).toBeNull
        })         
        .end(done);
    });
});

describe('PATCH /todos:id',() =>{
     
    it('should update the todo',(done)=>{
        var hexId = todos[0]._id.toHexString();
        var updatedText ='Updated from test....';

        request(app)
        .patch(`/todos/${hexId}`)   
        .send({text:updatedText,completed:true})     
        .expect(200)  
        .expect((res) => {
            expect(res.body.todo.text).toBe(updatedText);
            expect(res.body.todo.completed).toBe(true);
            expect(typeof res.body.todo.completedAt).toBe('number');
        })         
        .end(done);
    });

    it('should clear completedAt when todo is not completed',(done)=>{
        var hexId = todos[1]._id.toHexString();
        var updatedText ='Updated from server.test 1';

        request(app)
        .patch(`/todos/${hexId}`)   
        .send({text:updatedText,completed:false})     
        .expect(200)  
        .expect((res) => {
            expect(res.body.todo.text).toBe(updatedText);
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.completedAt).toBeNull();
        })         
        .end(done);
    });
 
});