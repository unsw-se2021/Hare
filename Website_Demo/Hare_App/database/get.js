//TODO
/**
 * Given the username/email and password, and db gives back uid. and if not valid err
 * Given the uid, return the preference object
 * Update preferences by uid
 * Save the product object, delete product object
 * Extras:
 * Registration
 * Updating user details
 */

//----------------------user info------------------------------
//check duplication of user's name
const check_username_unique = (user_collection, username) => {
  return new Promise((resolve, reject) => {
    user_collection.find({ "user.name": username }, (err, result) => {
      const user_count = result.length;
      if (user_count > 0) {
        reject("Duplicated username");
      } else {
        resolve(true);
      }
    });
  });
};

//check duplication of user's email
const check_useremail_unique = (user_collection, useremail) => {
  return new Promise((resolve, reject) => {
    user_collection.find({ "user.email": useremail }, (err, result) => {
      const user_count = result.length;
      if (user_count > 0) {
        reject("Duplicated user email");
      } else {
        resolve(true);
      }
    });
  });
};

//check password and username for login
const check_login_withUsername = (user_collection, username, userpws) => {
  return new Promise((resolve, reject) => {
    user_collection.find(
      { "user.name": username, "user.password": userpws },
      (err, result) => {
        const user_count = result.length;
        if (user_count === 0) {
          reject("Username / password invalid");
        } else {
          resolve(true);
        }
      }
    );
  });
};

//check password and useremail for login
const check_login_withUseremail = (user_collection, useremail, userpws) => {
  return new Promise((resolve, reject) => {
    user_collection.find(
      { "user.email": useremail, "user.password": userpws },
      (err, result) => {
        const user_count = result.length;
        if (user_count === 0) {
          reject("Useremail / password invalid");
        } else {
          resolve(true);
        }
      }
    );
  });
};

//get userID by username
const get_userId_by_username = (user_collection, username) => {
  return new Promise((resolve, reject) => {
    user_collection.find({ "user.name": username }, (err, result) => {
      const user_count = result.length;
      if (user_count === 0) {
        reject("invalid username");
      } else {
        const user_id = result[0].id;
        resolve(user_id);
      }
    });
  });
};

//get userId by useremail
const get_userId_by_useremail = (user_collection, useremail) => {
  return new Promise((resolve, reject) => {
    user_collection.find({ "user.email": useremail }, (err, result) => {
      const user_count = result.length;
      if (user_count === 0) {
        reject("invalid useremail");
      } else {
        const user_id = result[0].id;
        resolve(user_id);
      }
    });
  });
};

//get username by userId
const get_username_by_userId = (user_collection, userId) => {
  return new Promise((resolve, reject) => {
    user_collection.find({ uid: userId }, (err, result) => {
      const user_count = result.length;
      if (user_count === 0) {
        reject("invalid userId");
      } else {
        const username = result[0].user.name;
        resolve(username);
      }
    });
  });
};

//get useremail by userId
const get_useremail_by_userId = (user_collection, userId) => {
  return new Promise((resolve, reject) => {
    user_collection.find({ uid: userId }, (err, result) => {
      const user_count = result.length;
      if (user_count === 0) {
        reject("invalid userId");
      } else {
        const useremail = result[0].user.email;
        resolve(useremail);
      }
    });
  });
};

//--------------preferrence info---------------------------------------
//get preferenceId by userId
//used in setter functions to make changes
const get_preferenceId_by_userId = (profile_collection, userId) => {
  return new Promise((resolve, reject) => {
    profile_collection.find({ uid: userId }, (err, result) => {
      const user_count = result.length;
      if (user_count === 0) {
        reject("invalid userId");
      } else {
        const preference_id = result[0].preferences;
        resolve(preference_id);
      }
    });
  });
};

//get preference by userId
const get_preference_by_userId = (profile_collection, userId) => {
  return new Promise((resolve, reject) => {
    profile_collection.find({ uid: userId }, (err, result) => {
      const user_count = result.length;
      if (user_count === 0) {
        reject("invalid userId");
      } else {
        const preference_id = result[0].preferences;
        const preference = profile_collection.children.id(preference_id);
        resolve(preference);
      }
    });
  });
};

//get categories by userId
const get_pref_categories_by_userId = (profile_collection, userId) => {
  return new Promise((resolve, reject) => {
    profile_collection.find({ uid: userId }, (err, result) => {
      const user_count = result.length;
      if (user_count === 0) {
        reject("invalid userId");
      } else {
        const preference_id = result[0].preferences;
        const preference = profile_collection.children.id(preference_id);
        const catergories = preference.catergories;
        resolve(catergories);
      }
    });
  });
};

//get ingredients by userId
const get_pref_ingredients_by_userId = (profile_collection, userId) => {
  return new Promise((resolve, reject) => {
    profile_collection.find({ uid: userId }, (err, result) => {
      const user_count = result.length;
      if (user_count === 0) {
        reject("invalid userId");
      } else {
        const preference_id = result[0].preferences;
        const preference = profile_collection.children.id(preference_id);
        const ingredients = preference.ingredients;
        resolve(ingredients);
      }
    });
  });
};

//get category color preferrence by userId and category name
const get_category_color_pref_by_userId_and_category_name = (
  profile_collection,
  userId,
  category_name
) => {
  return new Promise((resolve, reject) => {
    profile_collection.find({ uid: userId }, (err, result) => {
      const user_count = result.length;
      if (user_count === 0) {
        reject("invalid userId");
      } else {
        const preference_id = result[0].preferences;
        const preference = profile_collection.children.id(preference_id);
        const catergories = preference.catergories;
        for (let i = 0; i < catergories.length; i++) {
          if (
            catergories[i].category.toLowerCase() ===
            category_name.toLowerCase()
          )
            resolve(catergories[i].color);
        }
        reject("category not found");
      }
    });
  });
};

//get ingredient color preferrence by userId and ingredient name
const get_ingredient_color_pref_by_userId_and_ingredient_name = (
  profile_collection,
  userId,
  ingredient_name
) => {
  return new Promise((resolve, reject) => {
    profile_collection.find({ uid: userId }, (err, result) => {
      const user_count = result.length;
      if (user_count === 0) {
        reject("invalid userId");
      } else {
        const preference_id = result[0].preferences;
        const preference = profile_collection.children.id(preference_id);
        const ingredients = preference.ingredients;
        for (let i = 0; i < ingredients.length; i++) {
          if (
            ingredients[i].ingredient.toLowerCase() ===
            ingredient_name.toLowerCase()
          )
            resolve(ingredients[i].color);
        }
        reject("ingredient not found");
      }
    });
  });
};

//-------------------------history info-----------------------------------
//get history by userId
const get_user_history_by_userId = (profile_collection, userId) => {
  return new Promise((resolve, reject) => {
    profile_collection.find({ uid: userId }, (err, result) => {
      const user_count = result.length;
      if (user_count === 0) {
        reject("invalid userId");
      } else {
        resolve(result[0].history);
      }
    });
  });
};

//get history size by userId
const get_user_history_size_by_userId = (profile_collection, userId) => {
  return new Promise((resolve, reject) => {
    profile_collection.find({ uid: userId }, (err, result) => {
      const user_count = result.length;
      if (user_count === 0) {
        reject("invalid userId");
      } else {
        const history_size = result[0].history.size;
        resolve(history_size);
      }
    });
  });
};

//get history size by userId
const get_locationId_by_userId = (profile_collection, userId) => {
  return new Promise((resolve, reject) => {
    profile_collection.find({ uid: userId }, (err, result) => {
      const user_count = result.length;
      if (user_count === 0) {
        reject("invalid userId");
      } else {
        resolve(result[0].history.location);
      }
    });
  });
};

//get location(user history object) by userId
const get_location_by_userId = (profile_collection, userId) => {
  return new Promise((resolve, reject) => {
    profile_collection.find({ uid: userId }, (err, result) => {
      const user_count = result.length;
      if (user_count === 0) {
        reject("invalid userId");
      } else {
        const location_id = result[0].history.location;
        const location = profile_collection.children.id(location_id);
        resolve(location);
      }
    });
  });
};

//get log by userId
const get_log_array_by_userId = (profile_collection, userId) => {
  return new Promise((resolve, reject) => {
    profile_collection.find({ uid: userId }, (err, result) => {
      const user_count = result.length;
      if (user_count === 0) {
        reject("invalid userId");
      } else {
        const location_id = result[0].history.location;
        const location = profile_collection.children.id(location_id);
        resolve(location.log);
      }
    });
  });
};

//-------------------------product ino----------------------------------

//get history products by userId throught product collection
const get_history_products_by_userId = (product_collection, userId) => {
  return new Promise((resolve, reject) => {
    product_collection.find({ owner: userId }, (err, result) => {
      const product_count = result.length;
      if (product_count === 0) {
        reject("the user hasnt saved any product");
      } else {
        resolve(result);
      }
    });
  });
};

//get product by product Id
const get_product_by_productId = (product_collection, productId) => {
  return new Promise((resolve, reject) => {
    product_collection.find({ da_id: productId }, (err, result) => {
      const product_count = result.length;
      if (product_count === 0) {
        reject("invalid productId");
      } else {
        resolve(result[0]);
      }
    });
  });
};

//get product name by product Id
const get_productName_by_productId = (product_collection, productId) => {
  return new Promise((resolve, reject) => {
    product_collection.find({ db_id: productId }, (err, result) => {
      const product_count = result.length;
      if (product_count === 0) {
        reject("invalid productId");
      } else {
        resolve(result[0].name);
      }
    });
  });
};

//get product images by product Id
const get_productImg_by_productId = (product_collection, productId) => {
  return new Promise((resolve, reject) => {
    product_collection.find({ db_id: productId }, (err, result) => {
      const product_count = result.length;
      if (product_count === 0) {
        reject("invalid productId");
      } else {
        resolve(result[0].img_srcs);
      }
    });
  });
};

//get product ingredients by product Id
const get_productIngrdts_by_productId = (product_collection, productId) => {
  return new Promise((resolve, reject) => {
    product_collection.find({ db_id: productId }, (err, result) => {
      const product_count = result.length;
      if (product_count === 0) {
        reject("invalid productId");
      } else {
        resolve(result[0].ingredients);
      }
    });
  });
};

//-----------------------------ingredients info---------------------------------
//get ingredient by ingredient Id
const get_ingredient_by_ingredientId = (
  ingredient_collection,
  ingredientId
) => {
  return new Promise((resolve, reject) => {
    ingredient_collection.find({ da_id: ingredientId }, (err, result) => {
      const product_count = result.length;
      if (ingredient_count === 0) {
        reject("invalid ingredientId");
      } else {
        resolve(result[0]);
      }
    });
  });
};

//get ingredient name by ingredient Id
const get_ingredientName_by_ingredientId = (
  ingredient_collection,
  ingredientId
) => {
  return new Promise((resolve, reject) => {
    ingredient_collection.find({ da_id: ingredientId }, (err, result) => {
      const ingredient_count = result.length;
      if (ingredient_count === 0) {
        reject("invalid ingredientId");
      } else {
        resolve(result[0].name);
      }
    });
  });
};

//get ingredient description by ingredient Id
const get_ingredient_desc_by_ingredientId = (
  ingredient_collection,
  ingredientId
) => {
  return new Promise((resolve, reject) => {
    ingredient_collection.find({ da_id: ingredientId }, (err, result) => {
      const ingredient_count = result.length;
      if (ingredient_count === 0) {
        reject("invalid ingredientId");
      } else {
        resolve(result[0].description);
      }
    });
  });
};

//get ingredient wikilink by ingredient Id
const get_ingredient_wikilink_by_ingredientId = (
  ingredient_collection,
  ingredientId
) => {
  return new Promise((resolve, reject) => {
    ingredient_collection.find({ da_id: ingredientId }, (err, result) => {
      const ingredient_count = result.length;
      if (ingredient_count === 0) {
        reject("invalid ingredientId");
      } else {
        resolve(result[0].wikilink);
      }
    });
  });
};

//get ingredient tally by ingredient Id
const get_ingredient_tally_by_ingredientId = (
  ingredient_collection,
  ingredientId
) => {
  return new Promise((resolve, reject) => {
    ingredient_collection.find({ da_id: ingredientId }, (err, result) => {
      const ingredient_count = result.length;
      if (ingredient_count === 0) {
        reject("invalid ingredientId");
      } else {
        resolve(result[0].tally);
      }
    });
  });
};

module.exports = {
  check_username_unique: check_username_unique,
  check_useremail_unique: check_useremail_unique,
  check_login_withUsername: check_login_withUsername,
  check_login_withUseremail: check_login_withUseremail,
  get_userId_by_username: get_userId_by_username,
  get_userId_by_useremail: get_userId_by_useremail,
  get_username_by_userId: get_username_by_userId,
  get_useremail_by_userId: get_useremail_by_userId,
  get_preferenceId_by_userId: get_preferenceId_by_userId,
  get_preference_by_userId: get_preference_by_userId,
  get_pref_categories_by_userId: get_pref_categories_by_userId,
  get_pref_ingredients_by_userId: get_pref_ingredients_by_userId,
  get_category_color_pref_by_userId_and_category_name: get_category_color_pref_by_userId_and_category_name,
  get_ingredient_color_pref_by_userId_and_ingredient_name: get_ingredient_color_pref_by_userId_and_ingredient_name,
  get_user_history_by_userId: get_user_history_by_userId,
  get_user_history_size_by_userId: get_user_history_size_by_userId,
  get_locationId_by_userId: get_locationId_by_userId,
  get_location_by_userId: get_location_by_userId,
  get_log_array_by_userId: get_log_array_by_userId,
  get_history_products_by_userId: get_history_products_by_userId,
  get_product_by_productId: get_product_by_productId,
  get_productName_by_productId: get_productName_by_productId,
  get_productImg_by_productId: get_productImg_by_productId,
  get_productIngrdts_by_productId: get_productIngrdts_by_productId,
  get_ingredient_by_ingredientId: get_ingredient_by_ingredientId,
  get_ingredientName_by_ingredientId: get_ingredientName_by_ingredientId,
  get_ingredient_desc_by_ingredientId: get_ingredient_desc_by_ingredientId,
  get_ingredient_wikilink_by_ingredientId: get_ingredient_wikilink_by_ingredientId,
  get_ingredient_tally_by_ingredientId: get_ingredient_tally_by_ingredientId
};
