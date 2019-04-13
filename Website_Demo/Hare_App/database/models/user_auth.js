const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const UserAuthSchema = new Schema({
	uid: { 
		type: Schema.Types.ObjectId,
		required: true, 
		description: "Must be a string, and is the root of user profile schema linkages"
	},
	user: {
		name: {
			type: String,
			unique: true,
			required: [true, "can't be empty"]
		},
		email: {
			type: String,
			lowercase: true,
			validate: (value)=>{
				return validator.isEmail(value)
			}
		},
		password: {
			type: String,
			required: [true, "can't be empty"]
		},
	}, 
	timestamp: Date 
});

//Ensuring uniqueness
UserAuthSchema.plugin(uniqueValidator, {message: 'Is already taken.'});

module.exports = user_auth = mongoose.model('user_auth', UserAuthSchema); 
