const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true },(error,client)=>{
    if(error){
        return console.log(error + 'Unable to connect to mongodb server');
    }
    console.log('Connected to mongodb server');

    const db= client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate({'text':'walk cat'},{$set:{'completed':true}},{returnOriginal:false}).then((result)=>{
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({'name':'Priyanka'},{$set:{'name':'Priyanka Y'},$inc:{'age':1}},{returnOriginal:false}).then((result)=>{
        console.log(result);
    });
    //client.close();
});
