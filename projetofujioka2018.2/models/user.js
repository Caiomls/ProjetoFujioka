var mongoose = require('mongoose');

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	isAdmin: {
		type: Boolean, default: false
	}
});

mongoose.model('User', schema)
