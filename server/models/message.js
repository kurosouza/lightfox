'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const messageSchema = new Schema({
		text: {
			type: String,
			required: true,
		},
	});


const Model = mongoose.model('Message', MessageSchema);

export default Model;
