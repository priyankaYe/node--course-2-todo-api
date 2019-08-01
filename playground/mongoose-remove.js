const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// Todo.remove({}).then((res)=>{
//     console.log(res);
// });

// Todo.findByIdAndRemove('5d417d9daec3dc22cd01ebf5').then((todo)=>{
//     console.log(todo);
// });

Todo.findOneAndRemove({_id : '5d417d9daec3dc22cd01ebf5'}, {useFindAndModify: false}).then((todo)=>{
    console.log(todo);
});


