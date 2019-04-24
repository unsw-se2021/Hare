const assert = require("assert");
const mongoose = require("mongoose");
const db_do = require("./helpers");
const db_model = require("./models/export");
const userAuthSchema = require("./models/user_auth");
const userPrefSchema = require("./models/preferences");
const historySchema = require("./models/history");

//--------------------setters for user auth ------------------
//Updating username
const setUsername = function(username, newUserName) {
  return new Promise((resolve, reject) => {
    userAuthSchema.findOneAndUpdate(
      { "user.name": username },
      { $set: { "user.name": newUserName } },
      { new: true },
      function(err, user) {
        if (user == null) {
          db_do.log("EVENT", "Username changed", "red");
          reject("Could not update username: %s", err);
        } else {
          resolve(user);
        }
      }
    );
  });
};

//Updating password
const setPassword = function(username, newPass) {
  return new Promise((resolve, reject) => {
    userAuthSchema.findOneAndUpdate(
      { "user.name": username },
      { $set: { "user.password": newPass } },
      { new: true },
      function(err, user) {
        if (user == null) {
          db_do.log("EVENT", "Username not found", "red");
          reject(err);
        } else {
          db_do.log("EVENT", "Password changed", "blue");
          resolve(user);
        }
      }
    );
  });
};

//---------------update preference info-------------------------------

//-----------update existing preference with new color --------------------------
//update_pref_category_color
//assume get preference id by user id,so the user is known
//assume category has been checked to be exsiting
//assume color has been checked ( between 0 to 5)
const update_pref_category_color = (
  prefrence_collection,
  prefId,
  category_name,
  newcolor
) => {
  return new Promise((resolve, reject) => {
    prefrence_collection.findById(prefId, (err, result) => {
      if (err) reject(err);
      else {
        const preference = result;
        const new_categories = preference.categories.map(x => {
          if (x.category.toLowerCase() === category_name.toLowerCase()) {
            x.color = newcolor;
          }
          return x;
        });
        preference.update(
          { uid: prefId },
          { categories: new_categories },
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(true);
            }
          }
        );
      }
    });
  });
};

//update_pref_ingredient_color
//assume get preference id by user id,so the user is known
//assume ingredient has been checked to be exsiting
//assume color has been checked ( between 0 to 5)
const update_pref_ingredient_color = (
  prefrence_collection,
  prefId,
  ingredient_name,
  newcolor
) => {
  return new Promise((resolve, reject) => {
    prefrence_collection.findById(prefId, (err, result) => {
      if (err) reject(err);
      else {
        const preference = result;
        const new_ingredients = preference.ingredients.map(x => {
          if (x.ingredient.toLowerCase() === ingredient_name.toLowerCase()) {
            x.color = newcolor;
          }
          return x;
        });
        preference.update(
          { uid: prefId },
          { ingredients: new_ingredients },
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(true);
            }
          }
        );
      }
    });
  });
};

//-----------delte existing preference--------------------------

//delete_pref_category
//assume get preference id by user id,so the user is known
//assume the category has been checked to be exsiting
const delete_pref_category = (prefrence_collection, prefId, category_name) => {
  return new Promise((resolve, reject) => {
    prefrence_collection.update(
      { uid: prefId },
      {
        $pull: {
          categories: { category: category_name }
        }
      },
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

//delete_pref_ingredient
//assume get preference id by user id,so the user is known
//assume ingredient has been checked to be exsiting
//assume the ingredient has been checked to be exsiting
const delete_pref_ingredient = (
  prefrence_collection,
  prefId,
  ingredient_name
) => {
  return new Promise((resolve, reject) => {
    prefrence_collection.update(
      { uid: prefId },
      {
        $pull: {
          ingredients: { ingredient: ingredient_name }
        }
      },
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

//-----------update preference info with new category and color--------------------------

//update_pref_with_new_category_and_color
//assume get preference id by user id,so the user is known
//assume the category has been checked to be new(non exsiting)
//assume color has been checked ( between 0 to 5)
const update_pref_with_new_category_and_color = (
  prefrence_collection,
  prefId,
  new_category,
  newcolor
) => {
  return new Promise((resolve, reject) => {
    prefrence_collection.update(
      { uid: prefId },
      {
        $push: {
          categories: { category: new_category, color: newcolor }
        }
      },
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(new_category);
        }
      }
    );
  });
};

//update_pref_with_new_ingredient_and_color
//assume get preference id by user id,so the user is known
//assume the ingredient has been checked to be new(non exsiting)
//assume color has been checked ( between 0 to 5)
const update_pref_with_new_ingredient_and_color = (
  prefrence_collection,
  prefId,
  new_ingredient,
  newcolor
) => {
  return new Promise((resolve, reject) => {
    prefrence_collection.update(
      { uid: prefId },
      {
        $push: {
          ingredients: { ingredient: new_ingredient, color: newcolor }
        }
      },
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(new_ingredient);
        }
      }
    );
  });
};

const update_userdata_prefs = (prefrence_collection, userdata, uid) => {
  return new Promise((resolve, reject) => {
    //update preferences object
    prefrence_collection.update(
      { uid: uid },
      {
        $set: {
          ingredients: userdata.preferences.ingredients,
          categories: userdata.preferences.categories
        }
      },
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      }
    );
  });
};

const update_userdata_history = (history_collection, userdata, uid) => {
  const new_log = userdata.products.map(x => {
    return { event: "product", eid: x };
  });

  return new Promise((resolve, reject) => {
    history_collection.update(
      { uid: uid },
      {
        $set: {
          log: new_log
        }
      },
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      }
    );
  });
};

const update_userdata = (db_do, userdata, uid) => {
  return new Promise((resolve, reject) => {
    update_userdata_prefs(userPrefSchema.preferences, userdata, uid)
      .then(() => {
        return update_userdata_history(historySchema, userdata, uid);
      })
      .then(() => {
        db_do.log("EVENT", "user data updated", "blue");
        resolve(true);
      })
      .catch(e => {
        db_do.log("EVENT", "error updating userdata: " + e, "red");
        reject(e);
      });
  });
};

module.exports = {
  setUsername: setUsername,
  setPassword: setPassword,
  update_pref_category_color: update_pref_category_color,
  update_pref_ingredient_color: update_pref_ingredient_color,
  delete_pref_category: delete_pref_category,
  delete_pref_ingredient: delete_pref_ingredient,
  update_pref_with_new_category_and_color: update_pref_with_new_category_and_color,
  update_pref_with_new_ingredient_and_color: update_pref_with_new_ingredient_and_color,
  update_userdata: update_userdata
};
