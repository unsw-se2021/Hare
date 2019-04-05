const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
  db_id: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  synonyms: [String],
  description: String,
  wikilink: String,
  tally: Number
});

module.exports = ingredient = mongoose.model("ingredient", IngredientSchema);
