var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var schemas = require("../models/schemas");
var _User = schemas.User;
var crypto = require("crypto");

router.get('/', function (req, res, next) {
    var info=req.query;
    if(info.email==undefined||info.password==undefined){
        res.send({
            status:"304",
            msg:"Missing params"
        });
    }else{
        _User.findOne({"email":info.email,"password":info.password}).then(function(user){
            res.set({
                "set-cookie":`TOKEN=${Date.now()}`
            })
            res.send({
                id:user._id,
                email:user.email,
                nickname:user.nickname,
                createTime:user.createTime,
                chapterIds:user.chapterIds,
                imgUrl:user.imgUrl
            });
        }).catch(function(e){
            res.send({
                status:"400",
                msg:"Mongo err:"+e
            })
        })
    }
});


module.exports = router;
