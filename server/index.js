'use strict';

const feathers = require('feathers');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');
const auth = require('feathers-authentication');
const local = require('feathers-authentication-local');
const jwt = require('feathers-authentication-jwt');
const bodyParser = require('body-parser');
const service = require('feathers-mongodb');
const memory = require('feathers-memory');
const handler = require('feathers-errors/handler');

const mongoClient = require('mongodb').MongoClient;

const app = feathers();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.configure(hooks());
app.configure(rest());
app.configure(socketio());


app.configure(auth({
		idField: '_id',
		secret: 'supersecret',
		tokenEndpoint: '/token',
		localEndpoint: '/login',
		header: 'X-Authorization',		
		service: 'users'
		
}));


// app.configure(local());

// app.configure(jwt());

mongoClient.connect('mongodb://localhost:27017/lightfox').then(function(db){

    
    app.use('/users', service({
            Model: db.collection('users')        
    }));
	

	// app.use('/users', memory());
	
    app.use('/messages', service({
            Model: db.collection('messages')
    }));	

	/*
	app.configure(local());
	app.configure(jwt());
	*/
         

    /*
    app.service('auth').hooks({
        before: { find: [ auth.hooks.authenticate('jwt')],
        create: [ local.hooks.hashPassword({passwordField: 'password'})] }
    });
    */
	
	app.use(handler());

	/*
    app.service('auth').hooks({
		before: {
			create: [
				auth.hooks.authenticate(['jwt','local'])
			],
			remove: [
				auth.hooks.authenticate('jwt')
			]
		},
	});
	
    */

    /*
    app.service('users').create({
        email: 'kurosouza@gmail.com',
        password: 'admin'
    });
	*/
    
    const server = app.listen(3000);
    
    server.on('listening', function(){
        console.log("Lightfox service started");        
    });
    
}).catch(function(error){
    console.error(error);   
});
