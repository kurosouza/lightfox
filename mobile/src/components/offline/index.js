'use strict'

import React, {Component} from 'react';
import {Text} from 'react-native';
import {Container, Header, Content, Title, Icon, Button} from 'native-base';

// import styles as baseStyles from '../login/styles';
const baseStyles = require('../login/styles');
import styles from './styles';

class Offline extends Component {
	constructor(props){
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Container style={baseStyles.container}>
				<Content>
					<Text style={baseStyles.screen_title}>You are offline</Text>
					<Icon name='md-alert' style={[baseStyles.logo,{fontSize:100, color:'#F76363'}]} />
					<Button capitalize style={baseStyles.btn}>
						<Icon name='md-refresh' />
						retry
					</Button>
				</Content>
			</Container>
		);
	}

}
