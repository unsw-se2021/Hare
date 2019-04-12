// Database client setup
const mongoose = require("mongoose");
const assert = require("assert");
const bodyParser = require("body-parser");
//const key = require("./config/db_keys").mongoURI;
const key = require('./config/db_dev_key').mongoURI;
const db_name = "HareDB";

// Database functions
const db_do = require("./helpers");
const getters = require("./get");
// Contains all document schema's to be used
const db_model = require("./models/export");

// Runtime mongoose connection. To test programmatic insertions, include under .then()
mongoose
  .connect(key, { useNewUrlParser: false})
  .then(err => {
      //db_do.log(log_type, msg, color)
      db_do.log("DB_BOOT", "Main.js Connected to cloud", "green");
      db_do.log("DB_RUN", "Press ctrl+c to exit", "green");
      //db_do.create_user_auth("Barack Obama", "brackboi@gmail.com", "joemyhomey");
      getters.get_username_by_userId(db_do, "5caec50082a5ec4a710b8d0b")
          .then(user => {
              console.log("User name is %s", user)
          })
          .catch(reason => {
              console.log("Username not found")
          })

  })
  .catch(err => {
    console.log("[ERROR]: " + err);
  });
