'use strict';

import React, {Component} from 'react';
import {View,Text, TouchableOpacity, ScrollView} from 'react-native';
import autobind from 'autobind-decorator';
import {Actions} from 'react-native-mobx';

import {Icon, Image, InputGroup, Container, Header, Title, Content, Input, Button, Thumbnail} from 'native-base';
import styles from './styles';

const logo = require('../../../img/photos.png');

const t = require('tcomb-validation');
const validate = t.validate;

const nonEmptyString = function(s) { return s != null && s != ''; };

const signInModel = t.struct({
	email: t.refinement(t.String, nonEmptyString),
	password: t.refinement(t.String, nonEmptyString),
});

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {email: '', password: '', validationMessage: ''};		
	}

	componentDidMount() {
		this.store = this.props.store;
		this.app = this.props.app;
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

	@autobind
	signInAction() {
		var signInInfo = {
			email: this.state.email,
			password: this.state.password,
		};

		var result = validate(signInInfo, signInModel);
		if(result.isValid()) {
			// continue sign in ..			
			console.log('validation ok. signing in ..');
			this.setState({validationMessage: ''});

			this.app.authenticate({
				strategy: 'local',
				username: this.state.email,
				password: this.state.password,
			}).then(response => {
				console.log('authenticated user: ', response);
				this.app.passport.verifyJWT(response.accessToken);
			}).then( payload => {
				console.log('JWT payload: ', payload);
				return this.app.service('users').get(payload.userId);
			}).catch(error => {
				console.error('Authentication error', error);
				
			});
			
		} else {
			// validation error ..
			console.log('validation error:' + result.firstError().message );
			this.setState({validationMessage: result.firstError().message });
		}
	}

	@autobind
	createAccount() {
		Actions.createAccount();
	}

	render() {
		return (
			<Container style={styles.container}>
				<Header>
					<Title>Login</Title>
				</Header>
				<Content>
					<ScrollView>
						<Thumbnail source={logo} size={100} style={styles.logo} />
						<Text style={styles.validation_message}>{this.state.validationMessage}</Text>
						<InputGroup style={styles.input}>
							<Icon name='md-person' size={30} />
							<Input placeholder="Email" value={this.state.email} onChangeText={this.emailChanged}/>
						</InputGroup>
						<InputGroup style={styles.input}>
							<Icon name='md-lock' size={30} />
							<Input placeholder="Password" secureTextEntry value={this.state.password} onChangeText={this.passwordChanged}/>
						</InputGroup>					
	
						<Button block success capitalize style={styles.btn} onPress={this.signInAction}>
							<Icon name='md-browsers' />
							sign in
						</Button>
	
						<Text style={{alignSelf: 'center', color: 'darkgray', marginTop:10, marginBottom: 10}}>OR</Text>				
	
						<Button block info capitalize style={styles.btn} onPress={this.createAccount}>
							<Icon name='md-add-circle' />
							create new account
						</Button>
					</ScrollView>
				</Content>
			</Container>
		);
	}

}

export default Login;
