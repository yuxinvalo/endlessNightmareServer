var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Classifications = require('../models/classificationModel');
var Articles = require('../models/articleModel');

mongoose.set('debug', true);

//连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/nightmare');

mongoose.connection.on("connected", function () {
    console.log("MongoDB connected success.")
});

mongoose.connection.on("error", function () {
    console.log("MongoDB connected fail.")
});

mongoose.connection.on("disconnected", function () {
    console.log("MongoDB connected disconnected.")
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/classification', function (req, res, next) {
    var condition = {};
    Classifications.find(condition, function (err, data) {
        if(err){
            console.log("error: " + err);
        } else {
            console.log("success: " + data);
            res.send(data);
        }
    });
});

router.post('/classification', function (req, res, next) {
    var sendMsg = 'success';
    var msg = {msg : sendMsg};
    var action = req.body.doAction;
    var id = req.body.classId;
    var focusLabel = req.body.label;
    if(!focusLabel){
        sendMsg = 'Null value';
        res.send(msg);
        console.log("Get a null value!");
        return;
    }
    if(action === 'add'){
       Classifications.update({_id: id},{$addToSet:{"labels": focusLabel}}, function (err) {
           if(err){
               res.send(500);
               console.log(err);
           } else {
               res.send(msg);
           }
       });
    } else if (action === 'delete'){
        Classifications.update({_id: id},{$pull:{"labels": focusLabel}}, function (err) {
            if(err){
                res.send(500);
                console.log(err);
            } else {
                res.send(msg);
            }
        });
    } else if(action === 'update'){
        Classifications.update({_id: id},{$pull:{"labels": focusLabel}}, function (err) {
            if(err){
                res.send(500);
                console.log(err);
            } else {
                Classifications.update({_id: id},{$addToSet:{"labels": req.body.newLabel}}, function (err) {
                    if(err){
                        res.send(500);
                        console.log(err);
                    } else {
                        res.send(msg);
                    }
                });
            }
        });
    }
});

router.get('/articles', function (req, res, next) {
    console.log("/articles get query : " + req.query.type);
    Articles.find({classification: req.query.type}, function (err, data) {
        if(err){
            console.log("error: " + err);
        } else {
            console.log("success: " + data);
            res.send(data);
        }
    })
});

router.post('/articles', function(req, res, next){
    var msg = {msg : "success"};
    //console.log("/article, post, get req : " + req.body);
    if(req.body.doAction === 'DELETE'){
        Articles.remove({_id: req.body.articleId},function (err) {
            console.log("DELETE ARTICLE CALLBACK: " + err);
            res.send(msg);
        })
    }
});

router.post('/addDream', function (req, res, next) {
    var msg = {msg : "success"};
    //console.log("/addDream post query: " + req.body);
    var body = req.body;
    var title = body.title;
    var classification = body.classification;
    var labels = body.labels.split(' ');
    labels.splice(labels.length - 1, 1);
    var content = body.content;
    //var Articles = mongoose.model('articleModel');
    var newDream = new Articles({
        title : title,
        classification: classification,
        labels : labels,
        dreamDate: body.dreamDate,
        content: content
    });
    newDream.save(function (msg) {
    console.log(msg)})
    res.send(msg);
})
module.exports = router;
