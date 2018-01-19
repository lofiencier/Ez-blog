//同时更新ChapterModel和CommentModel
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var schemas = require("../models/schemas");
var Chapter=schemas.Chapter;
var Comment=schemas.Comment;
var _User=schemas.User;

router.get('/',function(req,res,next){
    res.send("ok");
})

//评论是别人评论博主
//发表评论，需要post指定chapter的ID
//请求需要creatorId，chapterId，targetId(被回复者？),content
router.post('/publish',function(req,res,next){
    var UID=req.cookies.UID||"";
    var chapterId=req.body.chapterId;
    var targetId=req.body.targetId;
    // if(cookie){
    //需要检查是否已登录哦
    // }
    var _comment=new Comment({
        content:req.body.content,
        createTime:Date.now(),
    })
    Chapter.findById(chapterId).then(function(_cha){
        console.log("chapter查询完成");
        return Promise.all([
            _User.findById(UID),
            _User.findById(targetId),
            _cha
        ])
    }).spread(function(cUser,tUser,_cha){
        console.log("俩用户查询完成");
        _comment.creator=cUser;
        _comment.targetUser=tUser;
        return Promise.all([_comment.save(),_cha])
    }).spread(function(_comment,_cha){
        console.log("评论保存完成");
        _cha.comments.push(_comment);
        return _cha.save()
    }).then(function(){
        console.log("文章保存完成");
        res.send({
            status:"200",
            msg:"评论成功"
        })
    }).catch(function(e){
        console.log("SOMETHING BROKE:",e);
    })
})

module.exports=router;