'use strict';

const feathers = require('feathers');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');
const auth = require('feathers-authentication');
const local = require('feathers-authentication-local');
const jwt = require('feathers-authentication-jwt');
const bodyParser = require('body-parser');
const handler = require('feathers-errors/handler');

const mongoose = require('mongoose');
const service = require('feathers-mongoose');
const MessageModel = require('./models/message');
const UserModel = require('./models/user');
const authHooks = require('./hooks/auth-hooks');
// const authHooks2 = require('./hooks/auth-hooks-2');
const messageHooks = require('./models/message-hooks');

const app = feathers();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.configure(hooks());
app.configure(rest());
app.configure(socketio());

app.configure(auth({secret: 'supersecret', usernameField: 'email'}));
// app.configure(local());
// app.configure(jwt());

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/lightfox');

app.use('/messages', service({Model: MessageModel, lean: true}));

app.use('/users', service({Model: UserModel, lean: true}));

const userService = app.service('users');

userService.before(authHooks.before);
userService.after(authHooks.after);

const messageService = app.service('messages');
messageService.before(messageHooks.before);

app.use(handler());

const server = app.listen(3000);
    
server.on('listening', function(){
	console.log("Lightfox service started");        
});
