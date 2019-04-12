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
      //db_do.create_user_auth("r","r@gmail.com", "pass");
      // getters.get_username_by_userId(db_do, "5cafee97d511b1681250a4c8")
      //     .then(user=>{
      //         console.log("user  is %s", user)
      //     })
      getters.get_preference_by_userId(db_do, "5cafee97d511b1681250a4c8")
                .then(pref => {
                            console.log("Pref  is %s", pref)
                        })
                        .catch(reason => {
                            console.log("USER ID not found")
                        })


  })
  .catch(err => {
    console.log("[ERROR]: " + err);
  });
