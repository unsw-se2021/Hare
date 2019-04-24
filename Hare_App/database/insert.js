// Database client setup
const assert = require("assert");
const mongoose = require("mongoose");
const db_model = require("./models/export");

/*
 * insert_data()
 * @params
 *		data:	Instantiated model with data in it
 *		db_do:  Database function object must be passed to avoid circular reference
 *	@Notes
 *		This will immediately send this instantiation to whatever schema
 *		it has been given (collection).
 */

const insert_data = (db_do, data) => {
  assert.notEqual(data, null);
  data.save((err, product) => {
    assert.equal(err, null);
    let msg = String(data._id) + " object inserted";
    db_do.log("INSERT", msg, "yellow");
  });
};

/*
 * create_user_auth()
 * @params
 *		username:	..
 *		email:		..
 *		password:	..
 */

const create_user_auth = (username, email, password) => {
  const user_auth = require("./models/export").user_auth;
  const db_do = require("./helpers");
  const mongoose = require("mongoose");
  const check_username = require("./get").check_username_unique;
  const check_useremail = require("./get").check_useremail_unique;

  check_username(user_auth, username)
    .then(() => {
      return check_useremail(user_auth, email);
    })
    .then(() => {
      let userid = new mongoose.mongo.ObjectId();

      let new_user = new user_auth({
        _id: userid,
        uid: userid,
        user: {
          name: username,
          email: email,
          password: password
        },
        timestamp: new Date()
      });

      db_do.log(
        "EVENT",
        "New profile created at " + String(new_user._id),
        "blue"
      );

      insert_data(db_do, new_user);
      let history_id = create_history(db_do, userid);

      let preference_id = create_preferences(db_do, userid);

      create_profile(db_do, userid, history_id, preference_id);
    })

    .catch(err => {
        db_do.log("ERROR", "Duplicate profile creation prevented", "red");
    });
};

/*
 * create_profile()
 * @params
 *
 *
 */
const create_profile = (db_do, userid, history_id, preference_id) => {
  const profile = require("./models/export").profile;

  const new_profile = new profile({
    _id: userid,
    uid: userid,
    history: {
      size: 0,
      location: history_id
    },
    preferences: preference_id,
    timestamp: new Date()
  });

  insert_data(db_do, new_profile);

};

/*
 * create_preferences()
 * @params
 *
 *
 */

const create_preferences = (db_do, userId) => {
  const preferences = require("./models/export").preferences;
  const mongoose = require("mongoose");

  let preference_id = new mongoose.mongo.ObjectId();

  let new_preference = new preferences({
    _id: preference_id,
    uid: userId,
    default: true,
    categories: [],
    ingredients: []
  });

  insert_data(db_do, new_preference);
  return preference_id;
};

/*
 * create_history()
 * @params
 *
 */
const create_history = (db_do, userid) => {
  const history = require("./models/export").history;
  const mongoose = require("mongoose");

  let history_id = new mongoose.mongo.ObjectId();

  let new_history = new history({
    _id: history_id,
    uid: userid,
    log: []
  });
  insert_data(db_do, new_history);
  return history_id;
};

/*
 * create_result_page()
 * @params
 *
 *
 *
 */

const create_result_page = (db_do, scan_results, b64_image, owner) => {
  let ingredients = {};

  Object.keys(scan_results.categories).forEach(c => {
    scan_results.categories[c].forEach(i => {
      if (ingredients[i]) {
        ingredients[i].categories.push(c);
      } else {
        ingredients[i] = {
          categories: [c],
          desc: ""
        };
      }
    });
  });

  Object.keys(scan_results.ingredients).forEach(i => {
    ingredients[i].desc = scan_results.ingredients[i];
  });

  let ids = [];

  Object.keys(ingredients).forEach(i => {
    let id = create_ingredient(db_do, i, ingredients[i].desc, "", ingredients[i].categories);
    ids.push(id);
  });
  
  return create_product(db_do, "", b64_image, ids, owner);
};

/*
 * create_ingredient()
 * @params
 *
 *
 */

const create_ingredient = (db_do, ingrdtName, description, wikilink, categories) => {
  const ingredient = require("./models/export").ingredient;
  const mongoose = require("mongoose");
  const check_ingredient = require("./get").check_ingredient_unique;

  let ingredient_id = new mongoose.mongo.ObjectId();

  let new_ingredient = new ingredient({
    _id: ingredient_id,
    db_id: ingredient_id,
    name: ingrdtName,
    description: description,
    wikilink: wikilink,
    categories: categories,
    tally: 1
  });

  db_do.log(
    "EVENT",
    "New ingredient created at " + String(new_ingredient._id),
    "blue"
  );

  insert_data(db_do, new_ingredient);
  return ingredient_id;
};

const create_product = (db_do, prodName, img_path, ingredients, owner) => {
  const product = require("./models/export").product;
  const mongoose = require("mongoose");

  let product_id = new mongoose.mongo.ObjectId();

  let new_product = new product({
    _id: product_id,
    db_id: product_id,
    owner: owner,
    name: prodName,
    img_srcs: img_path,
    ingredients: ingredients
  });

  db_do.log(
      "EVENT",
      "New iproduct created at " + String(new_product._id),
      "blue"
  );

  insert_data(db_do, new_product);
  return product_id;

};

module.exports = {
  insert_data: insert_data,
  create_user_auth: create_user_auth,
  create_profile: create_profile,
  create_preferences: create_preferences,
  create_result_page: create_result_page,
  create_ingredient: create_ingredient,
  create_product: create_product
};
