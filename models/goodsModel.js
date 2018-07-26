var mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var productSchema = new Schema({
    id :{type:String},
    "index":String,
    "number":String,
    "price":String
});

module.exports = mongoose.model('Good',productSchema);