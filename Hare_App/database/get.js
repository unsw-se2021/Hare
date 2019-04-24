const assert = require("assert");
const mongoose = require("mongoose");
const db_do = require("./helpers");
const db_model = require("./models/export");
const userAuthSchema = require("./models/user_auth");
const userPrefSchema = require("./models/preferences");
const ingrSchema = require("./models/ingredient");
const prodSchema = require("./models/product");
const profileSchema = require("./models/profile");
const historySchema = require("./models/history");

//---------------Functions for asserting uniqueness----------------------

const check_username_unique = (user_collection , username)=>{
	return new Promise((resolve,reject)=>{
		user_collection.find({"user.name":username},(err,result)=>{
			const user_count=result.length;
			if(user_count>0){
				reject("Duplicated username");
			}else{
				resolve(true);
			}
		})
	})
}

const check_useremail_unique = (user_collection,useremail)=>{
	return new Promise((resolve,reject)=>{
		user_collection.find({"user.email":useremail},(err,result)=>{
			const user_count=result.length;
			if(user_count>0){
				reject("Duplicated useremail");
			}else{
				resolve(true);
			}
		})
	})
}

const check_ingredient_unique = (ingr_collection, ingreName) =>{
	return new Promise((resolve,reject)=>{
		ingr_collection.find({"name":ingreName},(err,result)=>{
			const ingr_count = result.length;
			if(ingr_count>0){
				reject("Duplicated Ingredient");
			}else{
				resolve(true);
			}
		})
	})
}


//-----------------------Getters for user_auth--------------------
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

const check_login = (db_do, username, password) => { 
	return new Promise((resolve, reject) => { 
		let db_creds = {}; 
		userAuthSchema.findOne({ "user.name": username }, (e, res) => {
			if(e == null && username == res.user.name && password == res.user.password) { 
				resolve(res.uid); 
			} else { 
				reject("Invalid details");
			} 
		});
	});
} 


//get userId by useremail
const get_userId_by_useremail = (db_do,  useremail) => {
	return new Promise((resolve, reject) => {
		userAuthSchema.findOne({ "user.email": useremail }, (err, user) => {
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
		userAuthSchema.findOne({ '_id': userId }, (err, user) => {
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
			if (user == null) {
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

//get preference object by user ID
const get_preference_by_userId = (db_do, userId) => {
	return new Promise((resolve, reject) => {
		userPrefSchema.preferences.findOne(({"uid": userId}), (err, pref) => {
			if (pref == null) {
				db_do.log("EVENT", "Preferences for given ID not found", "red");
				reject("Invalid userId");
			} else {
				db_do.log("EVENT", "Preferences found", "blue");
				resolve(pref);
			}
		})
	})
}

//--------------getters for ingredient Schema-----------------------

const get_ingredientID_by_name = (db_do, ingrName) =>{
	return new Promise((resolve, reject) => {
		ingrSchema.find(({"name": ingrName}), (err, ingr) => {
			if (ingr == null) {
				db_do.log("EVENT", "Ingredient name does not exist", "red");
				reject("Invalid ingredient name");
			} else {
				db_do.log("EVENT", "Ingredient ID found", "blue");
				update_ingredient_tally(db_do, ingrName)
					.then((ingr)=>{
						resolve(ingr._id);
					})
					.catch(err=>{
						console.log("Couldnt resolve ingredient")
					})
			}
		})
	})
}

const update_ingredient_tally = (db_do, ingrName) =>{
	return new Promise((resolve, reject) => {
		ingrSchema.findOneAndUpdate(({"name": ingrName}), {$inc: {'tally': 1}}, {new:true}, (err, ingr) => {
			if (ingr == null) {
				db_do.log("EVENT", "Ingredient name does not exist", "red");
				reject("Invalid ingredient name");
			} else {
				db_do.log("EVENT", "Ingredient tally updated", "blue");
				resolve(ingr);
			}
		})
	})
}


const get_ingr_wikilink_by_ingrName = ( db_do, ingrName ) => {
	return new Promise((resolve, reject) => {
		ingrSchema.findOne({ 'name': ingrName }, (err, result) => {
			if (result == null) {
				db_do.log("EVENT", "Ingredient Name does not exist", "red");
				reject("Invalid ingredientId");
			} else {
				db_do.log("EVENT", "Ingredient wikilink returned", "blue");
				resolve(result.wikilink);
			}
		})
	})
}

const get_ingr_description_by_ingrName = ( db_do, ingrName ) => {
	return new Promise((resolve, reject) => {
		ingrSchema.findOne({ 'name': ingrName }, (err, result) => {
			if (result == null) {
				db_do.log("EVENT", "Ingredient Name does not exist", "red");
				reject("Invalid ingredientId");
			} else {
				db_do.log("EVENT", "Ingredient description returned", "blue");
				resolve(result.description);
			}
		})
	})
}

//-------------------------Getters For Product Schema--------------------------



const get_product_by_productId = (db_do , productId) => {
	return new Promise((resolve, reject) => {
		prodSchema.findOne({ '_id': productId }, (err, result) => {
			if (result == null) {
				db_do.log("EVENT", "product ID does not exist", "red");
				reject("invalid productId");
			} else {
				db_do.log("EVENT", "Product returned", "blue");
				resolve(result);
			}
		})
	})
}

const get_productName_by_productId = (db_do, productId) => {
	return new Promise((resolve, reject) => {
		prodSchema.findOne({ 'db_id': productId }, (err, result) => {
			if (result == null) {
				db_do.log("EVENT", "product ID does not exist", "red");
				reject("invalid productId");
			} else {
				db_do.log("EVENT", "Product name returned", "blue");
				resolve(result.name);
			}
		})
	})
}


const get_productImg_by_productId = (db_do, productID) => {
	return new Promise((resolve, reject) => {
		prodSchema.findOne({ 'db_id': productID }, (err, result) => {
			if (result == null) {
				db_do.log("EVENT", "product ID does not exist", "red");
				reject("invalid productId");
			} else {
				db_do.log("EVENT", "Product image source path returned", "blue");
				resolve(result.img_srcs);
			}
		})
	})
}

const get_productIngredients_by_productId = (db_do, productID) => {
	return new Promise((resolve, reject) => {
		prodSchema.findOne({ 'db_id': productID }, (err, result) => {
			if (result == null) {
				db_do.log("EVENT", "product ID does not exist", "red");
				reject("invalid productId");
			} else {
				db_do.log("EVENT", "Product ingredients path returned", "blue");
				resolve(result.ingredients);
			}
		})
	})
}


//---------------- -Setters for product Schema-------------------


//-----------------Getters for Profile Schema -------------------

const get_profile_history_by_UserID = (db_do, userId) =>{
	return new Promise((resolve, reject) => {
		profileSchema.findOne({ 'uid': userId }, (err, result) => {
			if (result == null) {
				db_do.log("EVENT", "user ID does not exist", "red");
				reject("invalid userId");
			} else {
				db_do.log("EVENT", "Profile history returned", "blue");
				resolve(result);
			}
		})
	})
}


//-----------------Getters for  History Schema -------------------

const get_history_by_UserID = (db_do, userId) =>{
	return new Promise((resolve, reject) => {
		historySchema.findOne({ 'uid': userId }, (err, result) => {
			if (result == null) {
				db_do.log("EVENT", "user ID does not exist", "red");
				reject("invalid userId");
			} else {
				db_do.log("EVENT", "History returned", "blue");
				resolve(result);
			}
		})
	})
}


const get_log_array_by_userId = (db_do, userId) => {
	return new Promise((resolve, reject) => {
		historySchema.findOne({'uid': userId}, (err, result) => {
			if (result == null) {
				db_do.log("EVENT", "user ID does not exist", "red");
				reject("invalid userId");
			} else {
				db_do.log("EVENT", "History log returned", "blue");
				resolve(result);
			}
		})
	})
}

const get_userdata = (db_do, uid) => {
	return new Promise((resolve, reject) => {
		let username = "";
		let userlog = [];
		get_username_by_userId(db_do, uid).then(name => {
			username = name;
			return get_log_array_by_userId(db_do, uid);
		}).then(log => {
			userlog = log.log.map(x => x.eid);
			return get_preference_by_userId(db_do, uid);
		}).then(pref => {
			db_do.log("EVENT", "User data returned", "blue");
			resolve({
				username: username,
				preferences: pref,
				products: userlog
			});
		}).catch(e => {
			db_do.log("EVENT", "error getting user data: " + e, "red");
		});
	});
}

const get_ingredient_by_ID = (db_do, ingredient_id) => {

	const ingrSchema = require("./models/ingredient");
	return new Promise((resolve, reject) => {
		ingrSchema.findOne({'_id': ingredient_id}, (err, result) => {
			if (result == null) {
				db_do.log("EVENT", "ingredient ID does not exist", "red");
				reject("invalid ingredient ID");
			} else {
				db_do.log("EVENT", "Ingredient returned", "blue");
				resolve(result);
			}
		})
	})
}

const get_results_page = (db_do, product_id) => {
	return new Promise((resolve, reject) => {
		get_product_by_productId(db_do, product_id).then(prod => {
			let ingredient_ids = prod.ingredients;

			Promise.all(ingredient_ids.map(x => get_ingredient_by_ID(db_do, x)))
				.then(ingredients => {
					let categories = {};

					ingredients.forEach(i => {
						i.categories.forEach(c => {
							if (categories[c]) {
								categories[c].push({
									name: i.name,
									desc: i.description
								});
							} else {
								categories[c] = [{
									name: i.name,
									desc: i.description
								}]
							}
						});
					});
					resolve({
						product_id: product_id,
						img_url: prod.img_srcs[0],
						contents: categories
					})
				}).catch(reject);
		});
	});
}




//Adding category preference by userId
// const appendCategoryPref = (db_do,  userId, color, categoryName ){
//   return new Promise((resolve, reject) => {
//     //Find user
//     this.get_username_by_userId(userId)
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



//--------------preferrence info---------------------------------------
//get preferenceId by userId
//used in setter functions to make changes
// const get_preferenceId_by_userId = (profile_collection, userId) => {
//   return new Promise((resolve, reject) => {
//     profile_collection.find({ uid: userId }, (err, result) => {
//       const user_count = result.length;
//       if (user_count === 0) {
//         reject("invalid userId");
//       } else {
//         const preference_id = result[0].preferences;
//         resolve(preference_id);
//       }
//     });
//   });
// };



// //get category color preferrence by userId and category name
// const get_category_color_pref_by_userId_and_category_name = (
//   profile_collection,
//   userId,
//   category_name
// ) => {
//   return new Promise((resolve, reject) => {
//     profile_collection.find({ uid: userId }, (err, result) => {
//       const user_count = result.length;
//       if (user_count === 0) {
//         reject("invalid userId");
//       } else {
//         const preference_id = result[0].preferences;
//         const preference = profile_collection.children.id(preference_id);
//         const catergories = preference.catergories;
	//         for (let i = 0; i < catergories.length; i++) {
//           if (
//             catergories[i].category.toLowerCase() ===
//             category_name.toLowerCase()
	//           )
//             resolve(catergories[i].color);
	//         }
//         reject("category not found");
//       }
//     });
//   });
// };
//
// //get ingredient color preferrence by userId and ingredient name
// const get_ingredient_color_pref_by_userId_and_ingredient_name = (
//   profile_collection,
//   userId,
//   ingredient_name
// ) => {
//   return new Promise((resolve, reject) => {
//     profile_collection.find({ uid: userId }, (err, result) => {
//       const user_count = result.length;
	//       if (user_count === 0) {
	//         reject("invalid userId");
//       } else {
//         const preference_id = result[0].preferences;
//         const preference = profile_collection.children.id(preference_id);
	//         const ingredients = preference.ingredients;
//         for (let i = 0; i < ingredients.length; i++) {
//           if (
//             ingredients[i].ingredient.toLowerCase() ===
	//             ingredient_name.toLowerCase()
//           )
	//             resolve(ingredients[i].color);
//         }
//         reject("ingredient not found");
//       }
//     });
//   });
// };

//-------------------------history info-----------------------------------
//get history by userId
// const get_user_history_by_userId = (profile_collection, userId) => {
//   return new Promise((resolve, reject) => {
//     profile_collection.find({ uid: userId }, (err, result) => {
//       const user_count = result.length;
//       if (user_count === 0) {
//         reject("invalid userId");
//       } else {
//         resolve(result[0].history);
//       }
//     });
//   });
// };
//





module.exports = {
	findByUsername:findByUsername,
	check_username_unique: check_username_unique,
	check_useremail_unique: check_useremail_unique,
	get_userId_by_username: get_userId_by_username,
	get_userId_by_useremail: get_userId_by_useremail,
	get_username_by_userId: get_username_by_userId,
	get_useremail_by_userId: get_useremail_by_userId,
	get_preference_by_userId: get_preference_by_userId,
	get_ingredientID_by_name: get_ingredientID_by_name,
	check_ingredient_unique: check_ingredient_unique,
	get_ingr_wikilink_by_ingrName: get_ingr_wikilink_by_ingrName,
	get_ingr_description_by_ingrName:get_ingr_description_by_ingrName,
	get_product_by_productId: get_product_by_productId,
	get_productName_by_productId: get_productName_by_productId,
	get_productImg_by_productId: get_productImg_by_productId,
	get_productIngredients_by_productId: get_productIngredients_by_productId,
	get_profile_history_by_UserID:  get_profile_history_by_UserID,
	get_log_array_by_userId:  get_log_array_by_userId,
	get_userdata: get_userdata,
	get_results_page: get_results_page,
	check_login: check_login, 
};
