// Database client setup
const mongoose = require("mongoose");
const assert = require("assert");
const bodyParser = require("body-parser");
//const key = require("./config/db_keys").mongoURI;
const key = require('./config/db_dev_key').mongoURI;
const db_name = "HareDB";

// Database functions
const db_do = require("./helpers");
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

      db_do
          .get_userId_by_username(db_model.user_auth, "Barack Obama")
          .then(console.log);
        db_do
            .get_userId_by_useremail(db_model.user_auth, "brackboi@gmail.com")
            .then(console.log);
      //
      // db_do
      //       .get_username_by_userId(db_model.user_auth, "5ca6db502304272e95ec79f1")
      //       .then(console.log);
      // db_do
      //       .get_useremail_by_userId(db_model.user_auth, "5ca6db502304272e95ec79f1")
      //       .then(console.log);
    //
    // db_do
    //   .get_preferenceId_by_userId(db_model.profile, "5ca6db502304272e95ec79f1")
    //   .then(id => {
    //     db_do
    //       .update_pref_with_new_category_and_color(
    //         db_model.preferences,
    //         id,
    //         "Allergens",
    //         1
    //       )
    //       .then(console.log);
    //   });
    // db_do
    //   .get_preferenceId_by_userId(db_model.profile, "5ca6db502304272e95ec79f1")
    //   .then(id => {
    //     db_do
    //       .update_pref_with_new_ingredient_and_color(
    //         db_model.preferences,
    //         id,
    //         "Peanut",
    //         1
    //       )
    //       .then(console.log);
    //   });
  })
  .catch(err => {
    console.log("[ERROR]: " + err);
  });
