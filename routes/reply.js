//同时更新ChapterModel和CommentModel
var express = require('express');
var router = express.Router();
// var bluebird=require("bluebird");
var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');
var schemas = require("../models/schemas");
var Chapter=schemas.Chapter;
var Comment=schemas.Comment;
var _User=schemas.User;
var Reply=schemas.Reply;

router.get("/",function(req,res,next){
    Promise.all([
        _User.findById("5a60049483ca471ff414c833").exec(),
        _User.findById("5a6003c95e635223985fa75f").exec()
    ]).spread(function(u1,u2){
        console.log("查询完成");
        res.send({
            status:"200",
            users:u1
        })
    })
})

//commentId,replyer,beReplyer
//同时通知beReplyer被回复了___消息机制
router.post("/publish",function(req,res,next){
    var info=req.body;
    var _replay=new Reply({
        content:info.content,
        createTime:info.createTime    
    });
    // _User.findById()
    
    
})

module.exports=router;