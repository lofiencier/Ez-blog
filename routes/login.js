var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var schemas = require("../models/schemas");
var _User = schemas.User;
var crypto = require("crypto");

router.post('/', function (req, res, next) {
    var info=req.body;
    var cookie=req.cookies.UID;
    if(info.email==undefined||info.password==undefined){
        res.send({
            status:"304",
            msg:"Missing params"
        });
    }else{
        _User.findOne({"email":info.email,"password":info.password}).then(function(user){
            // res.set({
            //     "Set-Cookie":`UID=${user._id}`
            // });
            // console.log(user._id.toString());
            if(!cookie&&info.rememberLogin){
                console.log("Remember");
             res.cookie("UID",user._id.toString(),{maxAge:1000*60*60*24*10});
                
            }else if(!info.rememberLogin){
                console.log("NotRemember");
                res.cookie("UID",user._id.toString());
            }
            res.send({
               status:"200",
               profile:{
                id:user._id,
                email:user.email,
                nickname:user.nickname,
                createTime:user.createTime,
                chapterIds:user.chapterIds,
                imgUrl:user.imgUrl
               }
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
