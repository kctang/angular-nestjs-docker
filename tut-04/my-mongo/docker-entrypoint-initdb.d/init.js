db.createUser({
    user: 'my-tut-04-user',
    pwd: 'password',
    roles: [{role: 'dbOwner', db: 'tut-04'}]
});
db.createCollection("cats");
db.cats.insertOne({name: "orange"});
db.cats.insertOne({name: "kimchi"});
db.cats.insertOne({name: "lassie"});
db.cats.insertOne({name: "obiwan"});
db.cats.insertOne({name: "jumaat"});
