//--------------update user info-------------------------------

//update useremail by userId
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

module.exports = {
  update_useremail_by_userId: update_useremail_by_userId,
  update_userpws_by_userId: update_userpws_by_userId,
  update_username_by_userId: update_username_by_userId,
  update_pref_category_color: update_pref_category_color,
  update_pref_ingredient_color: update_pref_ingredient_color,
  delete_pref_category: delete_pref_category,
  delete_pref_ingredient: delete_pref_ingredient,
  update_pref_with_new_category_and_color: update_pref_with_new_category_and_color,
  update_pref_with_new_ingredient_and_color: update_pref_with_new_ingredient_and_color
};
