'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {Container, Header, Title, Content, Thumbnail, Input, InputGroup, Icon, Button} from 'native-base';
import {Actions} from 'react-native-mobx';
import autobind from 'autobind-decorator';

import styles from '../login/styles';

const t = require('tcomb-validation');

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
	}

	@autobind
	screenNameChanged(screen_name){

	}

	@autobind
	emailChanged(email) {

	}

	@autobind
	passwordChanged(password) {

	}

	@autobind
	cpasswordChanged(password) {
		
	}

	@autobind
	back() {
		Actions.pop();
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

						<Button block info capitalize style={styles.btn}>
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
