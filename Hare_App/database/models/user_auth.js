const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserAuthSchema = new Schema({
	uid: { 
		type: Schema.Types.ObjectId,
		required: true, 
		description: "Must be a string, and is the root of user profile schema linkages"
	},
	user: { 
		name: String, 
		email: String,
		password: String
	}, 
	timestamp: Date 
});

module.exports = user_auth = mongoose.model('user_auth', UserAuthSchema); 
