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

	screen_title: {
		color: '#3083C9',
		fontSize: 24,
		fontWeight: 'bold',		
	},

	input: {
		margin: 10,
		marginBottom: 20,
	},

	btn: {
		alignSelf: 'stretch',
		margin: 10	
	},	
	
	logo: {
		marginTop: 50,
		marginBottom: 20,
		alignSelf: 'center',
	},
	
	actions_pane: {
		flexDirection: 'row',
		margin: 10,
		marginTop: 20,
		justifyContent: 'space-between',
		
	},

	validation_message: {
		color: 'red',
		fontWeight: 'bold',
		fontSize: 15,
		margin:10,
		alignSelf: 'center'
	}

});

export default styles;
