const db_model = {
  ingredient: require("./ingredient"),
  preferences: require("./preferences").preferences,
  category_preference: require("./preferences").category_preference,
  ingredient_preference: require("./preferences").ingredient_preference,
  product: require("./product"),
  profile: require("./profile"),
  user_auth: require("./user_auth"),
  history: require("./history")
};

module.exports = db_model;
