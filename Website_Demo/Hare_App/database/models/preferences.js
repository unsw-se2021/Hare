const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoryPreference = new Schema({ 
	category: String, 
	color: Number
}); 

const ingredientPreference = new Schema({ 
	ingredient: String, 
	color: Number
}); 

const PreferencesSchema = new Schema({ 
	uid: {
		type: Schema.Types.ObjectId, required: true
	},
	default: Boolean,
	categories: [categoryPreference],
	ingredients: [ingredientPreference]
}); 

module.exports = { 
	category_preference: mongoose.model('category_preference', categoryPreference),
	ingredient_preference: mongoose.model('ingredient_preference', ingredientPreference),
	preferences: mongoose.model('preferences', PreferencesSchema) 
}
