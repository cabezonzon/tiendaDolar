const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ProductSchema = new Schema ({
    name: String,
    type: String,
    price: Number,
    stock: Number
});

module.exports = mongoose.model('Product', ProductSchema);
