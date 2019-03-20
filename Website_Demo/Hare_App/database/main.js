// Database client setup 
const mongoose = require('mongoose');
const assert = require('assert');
const bodyParser = require('body-parser');
const key = require('./config/db_keys').mongoURI;
const db_name = 'HareDB'; 

// Database functions
const db_do = require('./helpers');
// Contains all document schema's to be used 
const db_model = require('./models/export'); 

const joe_biden = new db_model.user_auth({
	uid: new mongoose.mongo.ObjectId(), 
	user: { 
		name: "Joe Biden", 
		email: "barackbros@hotmail.com.au", 
		password: "bros4ever"
	}, 
	timestamp: new Date(), 
}); 

// Runtime mongoose connection. To test programmatic insertions, include under .then() 
mongoose.connect(key, {useNewUrlParser: true})
	.then((err) => {
		//db_do.log(log_type, msg, color)
		db_do.log("DB_BOOT", "Main.js Connected to cloud", "green");
		db_do.log("DB_RUN", "Press ctrl+c to exit", "green");
		db_do.insert_data(db_do, joe_biden); 
	})
	.catch(err => {console.log("[ERROR]: " + err)})
