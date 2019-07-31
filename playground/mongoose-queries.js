const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id ='5d3ffba82b84465160d5903e';

if(!ObjectID.isValid(id)){
    console.log('Id not Valid');
}


Todo.find({
    _id:id
}).then((todos)=>{
    console.log('Todos',todos);
});

Todo.findOne({
    _id:id
}).then((todo)=>{
    console.log('Todo',todo);
});

Todo.findById(id).then((todo)=>{
    if(!todo)
    {
        return console.log('Todo by Id not found');    
    }
    console.log('Todo by Id',todo);
}).catch((e) => console.log(e));

