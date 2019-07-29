//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true },(error,client)=>{
    if(error){
        return console.log(error + 'Unable to connect to mongodb server');
    }
    console.log('Connected to mongodb server');

    const db= client.db('TodoApp');

    //Delete Many
    // db.collection('Users').deleteMany({name:'Priyanka'}).then((result)=>{
    //     console.log(result);
    // });

    //deleteOne
    db.collection('Users').deleteOne({_id:new ObjectID('5d3e9059203187581d05f3be')}).then((result)=>{
        console.log(result);
    });

    //Find one and delete
    // db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
    //     console.log(result);
    // });


    //client.close();
});
