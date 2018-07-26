var mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var classificationModel = new Schema({
    "_id" : ObjectId,
    "title" : String,
    "presentation" : String,
    "labels" : Array
});

module.exports = mongoose.model('Classification', classificationModel);