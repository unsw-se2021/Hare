//update useremail by userId in user collection
const update_useremail_by_userId = (user_collection, userId, newEmail) => {
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

//update_pref_category_color
//assume get preference id by user id,so the user is known
//assume color has been checked ( between 0 to 5)
const update_pref_category_color = (
  prefrence_collection,
  prefId,
  category_name,
  newcolor
) => {
  return new Promise((resolve, reject) => {
    const preference = prefrence_collection.children.id(prefId);
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
  });
};

//update_pref_ingredient_color
//assume get preference id by user id,so the user is known
//assume color has been checked ( between 0 to 5)
const update_pref_ingredient_color = (
  prefrence_collection,
  prefId,
  ingredient_name,
  newcolor
) => {
  return new Promise((resolve, reject) => {
    const preference = prefrence_collection.children.id(prefId);
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
  });
};

module.exports = {
  update_useremail_by_userId: update_useremail_by_userId,
  update_userpws_by_userId: update_userpws_by_userId,
  update_username_by_userId: update_username_by_userId,
  update_pref_category_color: update_pref_category_color,
  update_pref_ingredient_color: update_pref_ingredient_color
};
