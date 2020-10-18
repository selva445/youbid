const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const register = new Schema({
	name: {
		type: String,
		required: true
	},
	uid: {
		type: String
	},
	
	email: {
		type: String,
		required: true
	},
	time: {
		type: Date,
		default: Date.now()
	},

	password: {
		type: String,
		required: true
	},
	

})

module.exports = mongoose.model('register', register);