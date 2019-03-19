const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({ 
	owner: { type: Schema.Types.ObjectId, required: false }, 
	name: String,
	img_srcs: [String],
	ingredients: { 
		type: [Schema.Types.ObjectId],
	} 
}); 

module.exports = product = mongoose.model('product', ProductSchema); 
