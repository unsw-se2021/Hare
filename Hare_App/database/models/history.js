const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
	uid: { 
		type: Schema.Types.ObjectId,
		required: true, 
		description: "Must be a string, and is the root of user profile schema linkages"
	},
	log: [
		{ 
			event: String,
			eid: { type: Schema.Types.ObjectId, required: true }
		}
	]
});

module.exports = history = mongoose.model('history', HistorySchema); 
