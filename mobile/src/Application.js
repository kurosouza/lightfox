'use strict';


import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import {Router, Scene, Actions} from 'react-native-mobx';
import store from './stores/MessageStore';
import Login from './components/login';
import NewAccount from './components/new_account';
import Offline from './components/offline';
import Home from './components/home';

import 'babel-polyfill';
import feathers from 'feathers/client';

import rest from 'feathers-rest/client'
import superagent from 'superagent';

import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client';
import authentication from 'feathers-authentication-client';

if(window.navigator && Object.keys(window.navigator).length == 0) {
	window = Object.assign(window, { navigator: { userAgent: 'ReactNative'}});
}

var io = require('socket.io-client');

class Application extends Component {
	constructor() {
		super();

		const options = { transports: ['websocket'], forceNew: true};
		const socket = io('http://10.0.2.2:3000', options);

		this.state = { connected: false };

		this.app = feathers()
			.configure(socketio(socket))
			.configure(hooks())
			// .configure(rest('http://10.0.2.2:3000').superagent(superagent))
			.configure(authentication({
					storage: AsyncStorage,
			}));
	}

	componentDidMount() {
		this.setState({ loading: true });

		
		this.app.io.on('connect', () => {
			console.log('application connected ..');
			this.setState({connected: true});

			/*
			this.app.authenticate().then(() => {
				console.log('user authenticated.');
				this.setState({ loading: false });
				Actions.main();
			}).catch(error => {
				console.log('authentication failed. redirecting to login ..');
				this.setState({ loading: false });
				Actions.login();
			});
			*/
		});		

		this.app.io.on('disconnect', () => {
			this.setState({connected: false});
			Actions.offline();
		});
	}

	render() {
		return (
			<Router store={store}>
				<Scene key='root'>
					<Scene key='login' component={Login} initial={true} hideNavBar={true} app={this.app}/>
					<Scene key='createAccount' component={NewAccount} hideNavBar={true} app={this.app} />
					<Scene key='offline' component={Offline} hideNavBar={true} app={this.app}/>
					<Scene key='home' component={Home} hideNavBar={false} app={this.app}/>
				</Scene>
			</Router>
		);
	}

}

export default Application;
