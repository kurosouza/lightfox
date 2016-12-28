'use strict';

import React, {Component} from 'react';
import {View,Text, TouchableOpacity} from 'react-native';
import autobind from 'autobind-decorator';

import {Icon, Image, InputGroup, Container, Header, Content, Input, Button, Thumbnail} from 'native-base';
import styles from './styles';

const logo = require('../../../img/logo.png');



class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {email: '', password: ''};		
	}

	componentDidMount() {
		this.store = this.props.store;		
	}

	loginDetailChanged() {
		// validate login fields here
		console.log('login detail changed.');		
	}

	@autobind
	emailChanged(email){
		this.setState({email: email});
		console.log('email: ' + email);
	}

	@autobind
	passwordChanged(password){
		this.setState({password: password});
		console.log('password: ' + password);
	}

	render() {
		return (
			<Container style={styles.container}>
				<Header><Text style={styles.title}>Login</Text></Header>
				<Content>
					<Thumbnail source={logo} size={100} style={styles.logo} />
					<InputGroup style={styles.input}>
						<Icon name='md-person' size={30} />
						<Input placeholder="Email" value={this.state.email} onChangeText={this.emailChanged}/>
					</InputGroup>
					<InputGroup style={styles.input}>
						<Icon name='md-lock' size={30} />
						<Input placeholder="Password" secureTextEntry value={this.state.password} onChangeText={this.passwordChanged}/>
					</InputGroup>					

					<Button block success capitalize style={styles.btn}>
						<Icon name='md-browsers' />
						sign in
					</Button>

					<Text style={{alignSelf: 'center', color: 'darkgray', marginTop:10, marginBottom: 10}}>OR</Text>				

					<Button block info capitalize style={styles.btn}>
						<Icon name='md-add-circle' />
						create new account
					</Button>
					
				</Content>
			</Container>
		);
	}

}

export default Login;
