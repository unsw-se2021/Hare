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

const assert = require("assert");
const mongoose = require("mongoose");
const db_do = require("./helpers");
const db_model = require("./models/export");
const userAuthSchema = require("./models/user_auth");

//---------------LOGIN----------------------
const loginWithUsername = function (db_do, username, password){
  return new Promise((resolve, reject) =>{
    userAuthSchema.findOne({'user.name': username, 'user.password': password}, '-password', (err, user) =>{
      if(user == null){
        db_do.log("EVENT", "User cannot be authenticated", "red");
        reject("Incorrect credentials")
      }else{
        db_do.log("EVENT", "User authenticated", "blue");
        resolve(user)
      }
    })
  })
      .catch(err=>{
        console.log("Incorrect credentials")
      })
}

//Login with email
const loginWithEmail = function (db_do, email, password) {
  return new Promise((resolve, reject) =>{
    userAuthSchema.findOne({'user.email': email, 'user.password': password}, '-password', (err, user) =>{
      if(user == null){
        db_do.log("EVENT", "User cannot be authenticated", "red");
        reject("Incorrect credentials")
      }else{
        db_do.log("EVENT", "User authenticated", "blue");
        resolve(user)
      }
    })
  })
      .catch(err=>{
        console.log("Incorrect credentials")
      })
}


//-----------------------Getters from user_auth------------------
// FInd a user by username
const findByUsername = function (db_do, username) {
  return new Promise((resolve, reject) => {
  userAuthSchema.findOne({ 'user.name': username },  '-password' ,(err, user) => {
    if (user == null) {
      db_do.log("EVENT", "User not found", "red");
      reject("User not found by username");
    } else {
      db_do.log("EVENT", "User found", "blue");
      resolve(user);
    }
  })
      .catch(err=>{
            console.log("User not found by username")
      })
  })
}



//Find a user by email
const findByEmail = function (db_do, email) {
  return new Promise((resolve, reject) => {
    this.findOne({ 'user.email': email }, '-password', (err, user) => {
      if (user == null) {
        db_do.log("EVENT", "User not found", "red");
        reject("User not found");
      } else {
        db_do.log("EVENT", "User found", "blue");
        resolve(user);
      }
    })
  })
}

//get userID by username
const get_userId_by_username = (db_do, username) => {
  return new Promise((resolve, reject) => {
    userAuthSchema.findOne({ "user.name": username }, (err, user) => {
      if (user == null) {
        db_do.log("EVENT", "User not found", "red");
        reject("User does not exist")
      } else {
        db_do.log("EVENT", "User ID found", "blue");
        resolve( user.uid);
      }
    })
  })
}

//get userId by useremail
const get_userId_by_useremail = (db_do,  useremail) => {
  return new Promise((resolve, reject) => {
    userAuthSchema.find({ "user.email": useremail }, (err, user) => {
      if (user == null) {
        db_do.log("EVENT", "User not found", "red");
        reject("User does not exist")
      } else {
        db_do.log("EVENT", "User ID found", "blue");
        resolve( user.uid );
      }
    });
  });
};

//get username by userId
const get_username_by_userId = (db_do, userId) => {
  return new Promise((resolve, reject) => {
    userAuthSchema.findOne({ 'uid': userId }, (err, user) => {
      if (user == null) {
        db_do.log("EVENT", "User ID not found", "red");
        reject("User ID does not exist")
      } else {
        db_do.log("EVENT", "User Name found", "blue");
        resolve( user.user.name );
      }
    });
  });
};

//get useremail by userId
const get_useremail_by_userId = (db_do, userId) => {
  return new Promise((resolve, reject) => {
    userAuthSchema.findOne({ 'uid' : userId }, (err, user) => {
      if (user === null) {
        db_do.log("EVENT", "User ID not found", "red");
        reject("User ID does not exist")
      } else {
        db_do.log("EVENT", "User Email found", "blue");
        resolve( user.user.email);
      }
    })
  })
}

//-------------getters for Preferences Schema-------------------


// //SETTERS
// //Updating username
// UserSchema.statics.setUsername = function(username, newUserName){
//   return new Promise((resolve, reject) => {
//     this.findOneAndUpdate({'username' : username} , {$set: {'username' : newUserName}} , {new:true} , function(err, user){
//       if(user == null){
//         db_do.log("EVENT", "Username changed", 'red');
//         reject("Could not update username: %s", err)
//       }else{
//         resolve(user)
//       }
//     })
//   })
// }
//
// //Updating password
// UserSchema.statics.setPassword= function(username, newPass){
//   return new Promise((resolve, reject) => {
//     this.findOneAndUpdate({'username' : username} , {$set: {'password' : newPass}} , {new:true} , function(err, user){
//       if(user == null){
//         db_do.log("EVENT", "Username not found", 'red');
//         reject(err)
//       }else{
//         db_do.log("EVENT", "Password changed", 'blue');
//         resolve(user)
//       }
//     })
//   })
// }
//
//
// //Adding category preference by userName
// UserSchema.statics.appendCategoryPref = function( username, color, categoryName ){
//   return new Promise((resolve, reject) => {
//     //Find user
//     this.findByUsername(username)
//         .then(user =>{
//           //Find ingredient record from Ingredients record
//           //If it exists, add reference, else add to ingredient record
//           user.categorypref.push({'color' : color, 'category' : categoryName});
//           user.save(function (err, user) {
//             if (err) {
//               return console.error(err);
//             } else {
//               console.log("Saved IN: %s", user)
//               resolve(user)
//             }
//           })
//         })
//         .catch(reason => {
//           reject(reason)
//         })
//   })
// }
//
// //Adding an ingredientPreference by userName
// UserSchema.statics.appendIngredientPref = function( username, color, ingredientName ){
//   return new Promise((resolve, reject) => {
//     //Find user
//     this.findByUsername(username)
//         .then(user =>{
//           //Find ingredient record from Ingredients record
//           //If it exists, add reference, else add to ingredient record
//           db_do.log("EVENT", "User found" , "blue");
//           IngredientSchema.findIngredientByName(ingredientName)
//               .then(ingredient =>{
//                 db_do.log("EVENT", "Ingredient found" , "blue");
//                 user.ingredientpref.push({'color' : color, 'ingredient' : ingredient._id});
//                 user.save(function (err, user) {
//                   if (err) {
//                     return console.error(err);
//                   } else {
//                     console.log("Saved IN: %s", user)
//                     resolve(user)
//                   }
//                 })
//               })
//               .catch(reason => {
//                 user.ingredientpref.push({'color' : color, 'ingredient' : ingredientName});
//                 user.save(function (err, user) {
//                   if (err) {
//                     return console.error(err);
//                   } else {
//                     console.log("Saved IN: %s", user)
//                     resolve(user)
//                   }
//                 })
//               })
//         })
//         .catch(reason => {
//           reject(reason)
//         })
//   })
//----------------------user info------------------------------
//check duplication of user's name
// const check_username_unique = (user_collection, username) => {
//   return new Promise((resolve, reject) => {
//     user_collection.find({ "user.name": username }, (err, result) => {
//       const user_count = result.length;
//       if (user_count > 0) {
//         reject("Duplicated username");
//       } else {
//         resolve(true);
//       }
//     });
//   });
// };
//
// //check duplication of user's email
// const check_useremail_unique = (user_collection, useremail) => {
//   return new Promise((resolve, reject) => {
//     user_collection.find({ "user.email": useremail }, (err, result) => {
//       const user_count = result.length;
//       if (user_count > 0) {
//         reject("Duplicated user email");
//       } else {
//         resolve(true);
//       }
//     });
//   });
// };







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
  loginWithUsername: loginWithUsername,
  loginWithEmail:loginWithEmail,
  findByUsername:findByUsername,
  //check_username_unique: check_username_unique,
 // check_useremail_unique: check_useremail_unique,
 // check_login_withUsername: check_login_withUsername,
 // check_login_withUseremail: check_login_withUseremail,
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
