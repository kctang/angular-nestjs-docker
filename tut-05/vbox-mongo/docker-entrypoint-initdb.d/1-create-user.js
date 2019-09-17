db.createUser({
    user: 'my-tut-05-user',
    pwd: 'password',
    roles: [{role: 'dbOwner', db: 'tut-05'}]
});
