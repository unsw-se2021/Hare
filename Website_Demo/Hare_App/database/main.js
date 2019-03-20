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

// Runtime mongoose connection. To test programmatic insertions, include under .then() 
mongoose.connect(key, {useNewUrlParser: true})
	.then((err) => {
		//db_do.log(log_type, msg, color)
		db_do.log("DB_BOOT", "Main.js Connected to cloud", "green");
		db_do.log("DB_RUN", "Press ctrl+c to exit", "green");
		db_do.create_user_auth("Barack Obama", "brackboi@gmail.com", "joemyhomey");
	})
	.catch(err => {console.log("[ERROR]: " + err)})
