'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const MessageSchema = new Schema({
		id: {
			type: Number,
			required: true,
		},
	
		text: {
			type: String,
			required: true,
		},

		date: { type: Date, default: Date.now },
	});


const Model = mongoose.model('Message', MessageSchema);

module.exports = Model;
