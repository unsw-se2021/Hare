// Package imports
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const https = require("https");
const morgan = require("morgan");
const axios = require("axios");

// WRITTEN HANDLERS
const ocr = require("./external_api/ocr.js");
const product_result = require("./external_api/ingredients.js");

const empty_promise = () => {
	return new Promise((res, rej) => res());
};
const key = require("./database/config/db_keys").mongoURI;
const db_do = require("./database/helpers");
const db_model = require("./database/models/export");
const db_insert = require("./database/insert.js");
const db_get = require("./database/get.js");
const db_exports = require("./database/export.js");

const database = {
	check_login: db_get.check_login,
	add_user: db_insert.create_user_auth,
	add_new_product: db_insert.create_result_page,
	db_connect: empty_promise,
	get_product_by_pid: db_get.get_results_page,
	get_userdata: db_exports.get_userdata,
	update_userdata: db_exports.update_userdata
};

mongoose
	.connect(key, { useNewUrlParser: true })
	.then(err => {
		db_do.log("DB_BOOT", "Main.js Connected to cloud", "green");
		db_do.log("DB_RUN", "Press ctrl+c to exit", "green");
	})
	.catch(err => {
		console.log("[ERROR]: " + err);
	});

//-------------------------------------------------
//
//  FRONT-END ROUTES
//
//-------------------------------------------------

// Express declarations
const PORT = 8080;

// Express setup
const app = express();
app.use(
	bodyParser.json({
		limit: "5mb"
	})
);
app.use(
	bodyParser.urlencoded({
		limit: "5mb",
		parameterLimit: 100000,
		extended: false
	})
);
app.use(compression());
app.use(cookieParser());
app.use(morgan("combined"));
app.use(cors());

// WORKS FINE
app.post("/auth", (req, res) => {
	let response = {
		key: undefined,
		result: false
	};
	database
		.check_login(db_do, req.body.data.username, req.body.data.password)
		.then(key => {
			response.result = true;
			response.key = key;
			res.send(response);
		})
		.catch(e => {
			console.log(e);
			res.status(403);
			res.send(response);
		});
});

// WORKS FINE
app.post("/register", (req, res) => {
	console.log(req.body);
	let username = req.body.data.username;
	let useremail = req.body.data.email;
	let password = req.body.data.password;
	database
		.db_connect()
		.then(() => {
			return database.add_user(username, useremail, password);
		})
		.then(() => {
			res.send(JSON.stringify({ result: true }));
		})
		.catch(e => {
			res.status(400);
			res.send(JSON.stringify({ result: false }));
		});
});

// TODO SATRUDAY
// upload route as needed
app.post("/upload", (req, res) => {
	const image	= req.body.image;
	console.log(image);
	database
		.db_connect()
		.then(() => {
			return {
				special: [],
				categories: []
			};
		})
		.then(preferences => {
			ocr
				.get_ingredients(image)
				.then(product_ingredients => {
					return product_result.get_results(
						product_ingredients,
						preferences.special,
						preferences.categories,
						10
					);
				})
				.then(product_object => {
					let pid = database.add_new_product(db_do, product_object, image);
					return pid;
				})
				.then(pid => {
					res.send(
						JSON.stringify({
							product_id: pid
						})
					);
				})
				.catch(e => {
					res.status(400);
					console.log(e);
					res.send(e);
				});
		})
		.catch(e => {
			res.status(400);
			console.log(e);
			res.send(e);
		});
});

// TODO SATURDAY
//get product info
app.get("/product/:pid", (req, res) => {
	const pid = req.params["pid"];
	console.log("PID REQUEST:", pid);
	database
		.db_connect()
		.then(() => {
			return database.get_product_by_pid(db_do, pid);
		})
		.then(product_object => {
			res.header("Content-Type", "application/json");
			res.send(product_object);
		})
		.catch(e => {
			console.log(e);
			res.status(404);
			res.send(e);
		});
});

// DONE
//userdata endpoints
app.get("/userdata/key/:uid", (req, res) => {
	const uid = req.params["uid"];

	database
		.db_connect()
		.then(() => {
			let ud = database.get_userdata(db_do, uid).then(userdata => {
				console.log(userdata);
				res.header("Content-Type", "application/json");
				res.send(userdata);
			});
		})
		.catch(e => {
			res.status(404);
			res.send(e);
		});
});

// TODO saturday
app.post("/userdata/update/:uid", (req, res) => {
	const new_userdata = req.body;
	const uid = req.params["uid"];
	console.log(new_userdata);

	database
		.db_connect()
		.then(() => {
			database.update_userdata(db_do, new_userdata, uid).then(() => {
				res.send("");
			});
		})
		.catch(e => {
			res.status(400);
			res.send(e);
		});
});

app.get("/search/ingredients/:query", (req, res) => {
	const query = req.params["query"];

	res.send(
		JSON.stringify(
			product_result.get_ingredients().filter(x => x.includes(query))
		)
	);
});

app.get("/search/categories/:query", (req, res) => {
	const query = req.params["query"];

	res.send(
		JSON.stringify(
			product_result.get_categories().filter(x => x.includes(query))
		)
	);
});

app.listen(PORT);
