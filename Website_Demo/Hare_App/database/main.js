// Database client setup 
const mongoose = require('mongoose');
const assert = require('assert');
const bodyParser = require('body-parser');
const key = require('./config/db_keys').mongoURI;
const db_name = 'HareDB'; 

//Insertion functions
const insert_data = require('./insert'); 

// TEMPORARY TEST
const user_auth = require('./models/user_auth');
const product = require('./models/product'); 

const Joe = new user_auth(
	{
		uid: new mongoose.mongo.ObjectId(),
		user: { 
			name: "John Doe",
			email: "johndoe@gmail.com",
			password: "123"
		},
		timestamp: new Date() 
	}
); 

const Apple = new product({
	owner: Joe.uid,
	name: "Big apple",
	img_srcs: ["https://attractionsontario.ca/wp-content/uploads/2017/04/The-Big-Apple.jpg"],
});

const test_db = (Joe) => { 
	console.log("\x1b[31m[TEST]:\x1b[0m Running harcoded database saves");
	insert_data(Joe);
	insert_data(Apple);
}; 


mongoose.connect(key, {useNewUrlParser: true})
	.then((err) => {	
		console.log("\x1b[36m[DATABASE]:\x1b[0m Main.js connected");
		console.log("[INFO]: Press ctrl+c to exit...");
		// Uncomment this to test your database. 
		test_db(Joe);
	})
	.catch(err => {console.log("[ERROR]: " + err)})
