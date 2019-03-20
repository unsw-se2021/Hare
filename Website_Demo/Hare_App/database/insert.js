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
 *		
 */ 
const create_user_auth = () => { 
}; 

/*
 * create_profile()
 * @params
 *
 */
const create_profile = () => { 
}; 

/* 
 * create_preferences()
 * @params 
 *
 *
 */ 
const create_preferences = () => { 
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
