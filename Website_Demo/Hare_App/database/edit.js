//assume user name couldnt be changed

//update useremail by userId in user collection
//shoud be used with update_useremail_by_userId_Profile simultaneously
const update_useremail_by_userId_User = (user_collection, userId, newEmail) => {
  return new Promise((resolve, reject) => {
    user_collection.update(
      { uid: userId },
      { "user.email": newEmail },
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

//update useremail by userId in profile collection
//shoud be used with update_useremail_by_userId_User simultaneously
const update_useremail_by_userId_Profile = (
  profile_collection,
  userId,
  newEmail
) => {
  return new Promise((resolve, reject) => {
    profile_collection.update(
      { uid: userId },
      { "user.email.change": true, "user.email.value": newEmail },
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

//update user password by userId
const update_userpws_by_userId = (user_collection, userId, newpws) => {
  return new Promise((resolve, reject) => {
    user_collection.update(
      { uid: userId },
      { "user.password": newpws },
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

//update username by userId
const update_username_by_userId = (user_collection, userId, newname) => {
  return new Promise((resolve, reject) => {
    user_collection.update(
      { uid: userId },
      { "user.name": newname },
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

//update_pref_categories_colour
//assume colour is between 0 to 5
const update_pref_categorie_colour = (
  profile_collection,
  prefId,
  userId,
  category,
  colour
) => {
  return new Promise((resolve, reject) => {
    const preference = profile_collection.children.id(prefId);
    const new_categories = preference.categories.map(x => {
      if (x[0] === category) {
        x[1] = colour;
      }
      return x;
    });
    preference.update(
      { uid: userId },
      { categories: new_categories },
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

//update_pref_ingredients_colour
//assume colour is between 0 to 5
const update_pref_ingredient_colour = (
  profile_collection,
  prefId,
  userId,
  ingredient,
  colour
) => {
  return new Promise((resolve, reject) => {
    const preference = profile_collection.children.id(prefId);
    const new_ingredients = preference.categories.map(x => {
      if (x[0] === ingredient) {
        x[1] = colour;
      }
      return x;
    });
    preference.update(
      { uid: userId },
      { ingredients: new_ingredients },
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

//what is left is:
//function to validate the colour(between 0 to 5)
//update tally for ingredients
//update Product info and ingredients/substance data if neccessary(need to talk with michael and front end)

module.exports = {
  update_useremail_by_userId_User: update_useremail_by_userId_User,
  update_useremail_by_userId_Profile: update_useremail_by_userId_Profile,
  update_userpws_by_userId: update_userpws_by_userId,
  update_username_by_userId: update_username_by_userId,
  update_pref_categorie_colour: update_pref_categorie_colour,
  update_pref_ingredient_colour: update_pref_ingredient_colour
};
