// Package imports 
const express = require('express'); 
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser'); 
const compression = require('compression');
const cookieParser = require('cookie-parser'); 
const http = require('http'); 
const https = require('https');
const morgan = require('morgan'); 

// Express declarations 
const backport = process.env.PORT || 8081; 
const frontport = 8080;
const deployport = 80;
const app = express(); 
const start = () => { 
	app.use(bodyParser.json()); 
	app.use(compression()); 
	app.use(cookieParser()); 
	app.use(morgan('combined')); 
}; 

// Database declarations 
const database = require('./config/db_keys').mongoURI; 

// Mongoose connection to cloud database
//mongoose.connect(database)
//	.then(() => console.log('Mongo Database connected'))
//	.catch(err => {console.log('Database connection failed'); throw(err); });


module.exports = {
	"backport": backport, 
	"frontport": frontport,
	"deployport": deployport
} 
