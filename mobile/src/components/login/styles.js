'use strict'

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
	container: {
			position: 'absolute',
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			flexDirection: 'column',
		},

	title: {
		color: '#fff',
		fontSize: 22,
		fontWeight: 'bold',
	},

	input: {
		margin: 10,
		marginBottom: 20,
	},

	btn: {
		alignSelf: 'stretch',
		margin: 10	
	}	

});

export default styles;
