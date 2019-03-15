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
const backport = 8081; 
const frontport = 8081; 
const app = express(); 
const start = () => { 
	app.use(bodyParser.json()); 
	app.use(compression()); 
	app.use(cookieParser()); 
	app.use(morgan('combined')); 
}; 

// Database declarations 
const database = require('.//db_keys'); 






module.exports = {
	"backport": {backport}, 
	"frontport": {frontport},
	"deployport": "80"
} 
