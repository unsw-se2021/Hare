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
        const username = result[0].name;
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
        const useremail = result[0].email;
        resolve(useremail);
      }
    });
  });
};

//write the similiar functions for profile,product and rest of the object

//get preferenceId by userId
//used in setter functions to make changes
const get_preferenceId_by_userId = (profile_collection, userId) => {
  return new Promise((resolve, reject) => {
    profile_collection.find({ uid: userId }, (err, result) => {
      const user_count = result.length;
      if (user_count === 0) {
        reject("invalid userId");
      } else {
        const preference_id = result.preferences;
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
        const preference_id = result.preferences;
        const preference = profile_collection.children.id(preference_id);
        resolve(preference);
      }
    });
  });
};

//get categories by preference
const get_categories_by_preferences = (preferences_collection, preferences) => {
  return new Promise((resolve, reject) => {
    preferences_collection.find(
      { "preferences.db_id": preferences },
      (err, result) => {
        const preferences_count = result.length;
        if (preferences_count === 0) {
          reject("invalid preferences");
        } else {
          const catergories = result.catergories;
          resolve(catergories);
        }
      }
    );
  });
};

//get categories by userId
const get_categories_by_userId = (profile_collection, userId) => {
  return new Promise((resolve, reject) => {
    profile_collection.find({ uid: userId }, (err, result) => {
      const user_count = result.length;
      if (user_count === 0) {
        reject("invalid userId");
      } else {
        const preference_id = result.preferences;
        const preference = profile_collection.children.id(preference_id);
        const catergories = preference.catergories;
        resolve(catergories);
      }
    });
  });
};

//what left is :
//get email status
//get preference by userId
//get ingredients by preference
//get ingredients by userId

//location is production collection according to ducumentation librabry
//get product by userId
//get ingredients by product
//get images by product

//get name from ingrients collection
//get synonyms from ingrients collection
//get description from ingrients collection
//get drugbank link from ingrients collection
//get tally from ingrients collection

//D6 and D7
//dg.log

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
  get_categories_by_preferences: get_categories_by_preferences,
  get_categories_by_userId: get_categories_by_userId
};
