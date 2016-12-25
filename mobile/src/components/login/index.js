'use strict';

import React, {Component} from 'react';
import {View,Text, TouchableOpacity} from 'react-native';

import {Icon, Image, InputGroup, Container, Header, Content, Input, Button, Thumbnail} from 'native-base';
import styles from './styles';

const logo = require('../../../img/logo.png');

class Login extends Component {

	constructor() {
		super();		
	}

	componentDidMount() {
		this.store = this.props.store;
	}

	render() {
		return (
			<Container style={styles.container}>
				<Header><Text style={styles.title}>Login</Text></Header>
				<Content>
					<Thumbnail source={logo} size={100} style={styles.logo} />
					<InputGroup style={styles.input}>
						<Icon name='md-person' size={30} />
						<Input placeholder="Email" />
					</InputGroup>
					<InputGroup style={styles.input}>
						<Icon name='md-lock' size={30} />
						<Input placeholder="Password" secureTextEntry />
					</InputGroup>
					<View style={styles.actions_pane}>
						<TouchableOpacity >
							<Text>SIGN IN</Text>
						</TouchableOpacity>
						<TouchableOpacity>
							<Text>CREATE ACCOUNT</Text>
						</TouchableOpacity>
					</View>
					<Button block style={styles.btn}>Login</Button>
				</Content>
			</Container>
		);
	}

}

export default Login;
