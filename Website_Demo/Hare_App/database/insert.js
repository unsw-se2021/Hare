// Database client setup 
const assert = require('assert'); 
const mongoose = require('mongoose'); 
const db_model = require('./models/export'); 

/*
 * insert_data() 
 * @params 
 *		data:	Instantiated model with data in it 
 *		db_do:  Database function object must be passed to avoid circular reference
 *	@Notes
 *		This will immediately send this instantiation to whatever schema
 *		it has been given (collection). 
 */ 
const insert_data = (db_do, data) => { 
	assert.notEqual(data, null); 
	data.save((err, product) => { 
		assert.equal(err, null);
		let msg = String(data._id) + " object inserted";
		db_do.log("INSERT", msg, "yellow");  
	});
}; 

/* 
 * create_user_auth()
 * @params 
 *		username:	..
 *		email:		..
 *		password:	.. 
 */ 
const create_user_auth = (username, email, password) => { 
	const user_auth = require('./models/export').user_auth; 
	const db_do = require('./helpers'); 
	const mongoose = require('mongoose');
	const check_username = require('./get').check_username;	

	check_username(user_auth, username).then((value) => {
		let userid = new mongoose.mongo.ObjectId(); 
		let new_user = new user_auth({
			_id: userid,
			uid: userid, 
			user: { 
				name: username,
				email: email,
				password: password
			},
			timestamp: new Date()
		});
		db_do.log("EVENT", "New profile created at " + String(new_user._id), "blue"); 
		insert_data(db_do, new_user); 
		let history_id = create_history(db_do, userid);
		// call create_preferences();
		let preference_id = create_preferences(db_do, userid);
		// call create_profile();
		create_profile(db_do, userid, history_id, preference_id);
	}).catch((err) => { 
		db_do.log("ERROR", "Duplicate profile creation prevented", "red"); 
	});
}; 

/*
 * create_profile()
 * @params
 *
 *
 */
const create_profile = (db_do, userid, history_id, preference_id) => { 
	const profile = require('./models/export').profile; 
	const mongoose = require('mongoose'); 
	let profile_id = new mongoose.mongo.ObjectId(); 
	const new_profile = new profile({
		_id: profile_id,
		uid: userid, 
		history: { 
			size: 0, 
			location: history_id 
		},
		preferences: preference_id,
		timestampe: new Date(),
	}); 
	insert_data(db_do, new_profile);
	return profile_id; 
}; 

/* 
 * create_preferences()
 * @params 
 *
 *
 */ 
const create_preferences = (db_do, userid) => { 
	const preferences = require('./models/export').preferences
	const mongoose = require('mongoose');
	let preference_id = new mongoose.mongo.ObjectId();
	let new_preference = new preferences({ 
		_id: preference_id, 
		uid: userid, 
		default: true,
		categories: [],
		ingredients: [] 
	}); 
	insert_data(db_do, new_preference);
	return preference_id;
}; 

/*
 * create_history()
 * @params
 *
 */
const create_history = (db_do, userid) => { 
	const history = require('./models/export').history; 
	const mongoose = require('mongoose'); 
	let history_id = new mongoose.mongo.ObjectId(); 
	let new_history = new history({ 
		_id: history_id, 
		uid: userid, 
		log: [],
	});
	insert_data(db_do, new_history); 
	return history_id; 
}; 


/* 
 * create_result_page() 
 * @params 
 *
 *
 *
 */ 
const create_result_page = () => { 
}; 

/* 
 * create_ingredient()
 * @params 
 *
 *
 */
const create_ingredient = () => { 
} 
module.exports = {
	insert_data: insert_data,
	create_user_auth: create_user_auth, 
	create_profile: create_profile, 
	create_preferences: create_preferences, 
	create_result_page: create_result_page, 
	create_ingredient: create_ingredient
};  
