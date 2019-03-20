// Database client setup 
const assert = require('assert'); 
const mongoose = require('mongoose'); 

/*
 * insert_data() 
 * @params 
 *		data: Instantiated model with data in it 
 *	@Notes
 *		This will immediately send this instantiation to whatever schema
 *		it has been given (collection). 
*/ 
const insert_data = (data) => { 
	assert.notEqual(data, null); 
	data.save((err, product) => { 
		assert.equal(err, null); 
		console.log("[SAVE]: " + String(data.uid));
	});
	//.catch(err => { 
	//	console.log("[ERROR]: " + err);
	//}); 
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
};  
