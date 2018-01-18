var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var schemas = require("../models/schemas");
var _User = schemas.User;
var Chapter=schemas.Chapter;
var crypto = require("crypto");

router.get('/', function (req, res, next) {
    // var cookie=req.get("Cookie")?req.get("Cookie"):"";
    // var cookie=req.header.cookie;
    // res.set({
    //     "Set-Cookie":"UID=5a5c72244c470f196c26301b"
    // })
    // // console.log(cookie);
    res.send("chapter");
})


//读取cookie中的User id 获取某一user,push到user.chapters
router.post("/publish",function(req,res,next){
    var UID=req.cookies.UID;
    var _chapter=new Chapter({
        title:req.body.title,
        content:req.body.content,
        createTime:Date.now()
    });
    _User.findById(UID).then(function(user){
        // res.send(user);
        user.chapters.push(_chapter);
        _chapter.creator=user;
        return Promise.all([_chapter.save(),user])
    }).spread(function(_chapter,user){
        console.log(_chapter);
        return Promise.all([user.save()],_chapter);
        //或许只是有更改的时候才会传递下层呢
    }).spread(function(user,_chapter){
        res.send({
            status:"200",
            msg:"Publish completed!"
            // chapter:typeof _chapter
        });
    })
    // console.log(req.cookies.UID);
    // res.send("");
})
router.post("/delete",function(req,res,next){

})
module.exports=router;