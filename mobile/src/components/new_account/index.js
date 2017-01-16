'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {Container, Header, Title, Content, Thumbnail, Input, InputGroup, Icon, Button} from 'native-base';
import {Actions} from 'react-native-mobx';
import autobind from 'autobind-decorator';

import styles from '../login/styles';

const t = require('tcomb-validation');
const validate = t.validate;

const logo = require('../../../img/user-6.png');

const nonEmptyString = function(s) { return s != null && s != ''; };
const newAccountModel = t.struct({
	screen_name: t.refinement(t.String, nonEmptyString),
	email: t.refinement(t.String, nonEmptyString),
	password: t.refinement(t.String, nonEmptyString),
	cpassword: t.refinement(t.String, nonEmptyString),
});

class NewAccount extends Component {

	constructor(props) {
		super(props);
		this.state = {validationMessage: '', screen_name:'', email: '', password: '', cpassword: ''};
	}

	componentDidMount() {
		this.store = this.props.store;
		this.app = this.props.app;
	}

	@autobind
	screenNameChanged(screen_name){
		this.setState({screen_name: screen_name});
	}

	@autobind
	emailChanged(email) {
		this.setState({email: email});
	}

	@autobind
	passwordChanged(password) {
		this.setState({password: password});
	}

	@autobind
	cpasswordChanged(cpassword) {
		this.setState({cpassword: cpassword});
	}

	@autobind
	back() {
		Actions.pop();
	}

	@autobind
	createAccountAction() {
		// validate form fields here
		let result = validate(this.state, newAccountModel);
		if(result.isValid()) {
			// inputs valid. proceed
			let userService = this.app.service('users');

			userService.create({
				email: this.state.email,
				password: this.state.password,
				screen_name: this.state.screen_name,				
			}).then(() => {
				console.log('user ' + this.state.email + ' created successfully.');
				this.app.authenticate({
					endpoint: '/auth/local',
					strategy: 'local',
					email: this.state.email,
					password: this.state.password,
					
				}).then((result) => {
					console.log('Authentication successful: ' + result);
					Actions.home();
				}).catch((e) => {
					console.log('Post-registration authentication failed: ' + e);
					this.setState({validationMessage: 'PRA failure: ' + e});
				});
			}).catch((error) => {
				console.log('Error creating account: ' + error);
				this.setState({validationMessage: 'Could not create account: ' + error});
			});
		} else {
			// display validation errors
			this.setState({validationMessage: result.firstError().message});
		}
	}

	render() {
		return (
			<Container style={styles.container}>
				<Header>
					<Button transparent>
						<Icon name='md-arrow-back' onPress={this.back}/>
					</Button>					
					<Title>New user</Title>
				</Header>
				<Content>
					<ScrollView>
						<Thumbnail source={logo} size={100} style={styles.logo} />
						<Text style={styles.validation_message}>{this.state.validationMessage}</Text>
						<InputGroup style={styles.input}>
							<Icon name='md-contact' size={30} />
							<Input placeholder='Name' value={this.state.screen_name} onChangeText={this.screenNameChanged} />
						</InputGroup>

						<InputGroup style={styles.input}>
							<Icon name='md-at' size={30} />
							<Input placeholder='Email' value={this.state.email} onChangeText={this.emailChanged} />
						</InputGroup>

						<InputGroup style={styles.input}>
							<Icon name='md-lock' size={30} />
							<Input placeholder="Password" secureTextEntry value={this.state.password} onChangeText={this.passwordChanged}/>
						</InputGroup>					

						<InputGroup style={styles.input}>
							<Icon name='md-lock' size={30} />
							<Input placeholder="Confirm password" secureTextEntry value={this.state.cpassword} onChangeText={this.cpasswordChanged}/>
						</InputGroup>

						<Button block info capitalize style={styles.btn} onPress={this.createAccountAction}>
							<Icon name='md-person-add'/>
							create account
						</Button>
						
					</ScrollView>
				</Content>
			</Container>
		);
		
	}

}

export default NewAccount;
