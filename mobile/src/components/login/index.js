'use strict';

import React, {Component} from 'react';
import {View,Text} from 'react-native';

import {Icon, Image, InputGroup, Container, Header, Content, Input, Button} from 'native-base';
// import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './styles';

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
				<Header><Text>Login</Text></Header>
				<Content>
					<InputGroup style={styles.input}>
						<Icon name='md-person' size={30} />
						<Input placeholder="Email" />
					</InputGroup>
					<InputGroup style={styles.input}>
						<Icon name='md-lock' size={30} />
						<Input placeholder="Password" secureTextEntry />
					</InputGroup>
					<Button block style={styles.btn}>Login</Button>
				</Content>
			</Container>
		);
	}

}

export default Login;
