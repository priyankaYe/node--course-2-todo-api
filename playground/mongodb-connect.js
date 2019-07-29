//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true },(error,client)=>{
    if(error){
        return console.log(error + 'Unable to connect to mongodb server');
    }
    console.log('Connected to mongodb server');

    const db= client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text:'Something to do',
    //     completed: false
    // },(error,result) =>{
    //     if(error){
    //         return console.log('Unable to insert todo');
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // });

    
    // db.collection('Users').insertOne({
    //     name:'Priyanka',
    //     age:28,
    //     location:'Mumbai'
    // },(error,result) =>{
    //     if(error){
    //         return console.log('Unable to insert user');
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // });

    client.close();
});
