const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({ 
	name: { type: String, required: true },
	synonyms: [String], 
	description: String, 
	wikilink: String,
	categories: [String],
	tally: Number
}); 

module.exports = ingredient = mongoose.model('ingredient', IngredientSchema); 
