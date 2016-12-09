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

		user: { type: Schema.Types.ObjectId, ref: 'User'},
	});


const Model = mongoose.model('Message', MessageSchema);

module.exports = Model;
