var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goodsModel');//加载模型表

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

//查询商品列表数据
router.get("/", function (req,res,next) {
    var condition = {};
    Goods.find(condition, function (err, ress) {
        if(err){
            console.log("error: " + err);
        } else {
            console.log("success: " + ress);
            res.send(ress);
        }
    })
    mongoose.connection.on("disconnected", function () {
        console.log("MongoDB connected disconnected.")
    });
});


module.exports = router;