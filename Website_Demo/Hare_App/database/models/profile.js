const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({ 
	uid: { 
		type: Schema.Types.ObjectId, 
		required: true, 
		description: "A linking reference between the profile and the user authentication details"
	},
    history: { 
        size: Number,
        location: { type: Schema.Types.ObjectId, required: true }
    }, 
    preferences: { type: Schema.Types.ObjectId, required: true },
    timestamp: Date  
}); 

module.exports = profile = mongoose.model('profile', ProfileSchema); 
