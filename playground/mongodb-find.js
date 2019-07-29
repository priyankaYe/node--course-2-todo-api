//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true },(error,client)=>{
    if(error){
        return console.log(error + 'Unable to connect to mongodb server');
    }
    console.log('Connected to mongodb server');

    const db= client.db('TodoApp');

    // db.collection('Todos').find().toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err) => {
    //     console.log('Unable to fetch todos',err);
    // });


    // db.collection('Todos').find({_id:new ObjectID('5d3b032fa6a6e144646395c4')}).toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err) => {
    //     console.log('Unable to fetch todos',err);
    // });

    //  db.collection('Todos').find().count().then((count)=>{
    //     console.log('Todos count:',count);        
    // },(err) => {
    //     console.log('Unable to fetch todos',err);
    // });


    db.collection('Users').find({name:'Priyanka'}).toArray().then((docs)=>{
        console.log('Users');
        console.log(JSON.stringify(docs,undefined,2));
    },(err) => {
        console.log('Unable to fetch users',err);
    });
    //client.close();
});
