
'use strict'

import React, {Component} from 'react';
import {Router, Scene} from 'react-native-mobx';
import store from './stores/MessageStore';
import Login from './components/login';


class Application extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<Router store={store}>
				<Scene key='root'>
					<Scene key='login' component={Login} initial={true} hideNavBar={true} store={store} />
				</Scene>
			</Router>
		);
	}

}

export default Application;
