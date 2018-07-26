var mongoose = require('mongoose')
const Schema = mongoose.Schema;

var articleModel = new Schema({
    "title" : String,
    "labels" : Array,
    "dreamDate" : Date,
    //"recordDate" : { type: Date, default: Date.now },
    "classification" : String,
    "content" : String
});

module.exports = mongoose.model('Article', articleModel);