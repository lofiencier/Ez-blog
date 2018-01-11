var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var schemas = require("../models/schemas");
var Test=schemas.Test;
var _User=schemas.User;
mongoose.Promise=global.Promise;

router.get('/', function (req, res, next) {
    // var _test=new Test({name:"ares",content:"Hello mongo"});
    // var tom=new _User({
    //     email:111,
    //     nickname:"ares",
    //     creatTime:111
    // })

    // tom.save().then(function(user){
    //     _test.author=user;
    //     return _test.save();
    // }).then(function(_test){
    //     user.tests.push(_test);
    //     console.log(user);
    //     return user.save();
    // }).then(function(){
    //     // console.log()
    //     res.send("OK");
    // }).catch(function(e){
    //     res.send(e);
    // })
    
  
    // res.send("iok");
    Test.findOne({'_id': '5a57924e9f897f1344bb434d'}).populate({path:'author',select:'nickname email creatTime  -_id'})
    .then(function(user){
        console.log(user);
        res.send(user);
    }).catch(function(reason){
        console.log(reason)
    })

});

module.exports=router;