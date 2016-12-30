'use strict';

import React, {Component} from 'react';
import {Container, Content, Title, Header} from 'native-base';
import {View, Text} from 'react-native'

const baseStyles = require('../login/styles');

class Home extends Component {

	constructor(props) {
		super(props);		
	}

	componentDidMount() {
		this.store = this.props.store;
	}

	render() {
		return (
			<Container style={baseStyles.container}>
				<Header>
					<Title>Home</Title>
				</Header>
				<Content>
					<Text style={baseStyles.screen_title}>Main page content</Text>
				</Content>
			</Container>
		);
	}

}


export default Home;
