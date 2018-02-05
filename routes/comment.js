//同时更新ChapterModel和CommentModel
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var schemas = require("../models/schemas");
var Chapter=schemas.Chapter;
var Comment=schemas.Comment;
var _User=schemas.User;
var Reply=schemas.Reply;

router.get('/',function(req,res,next){
    res.send("ok");
})

//评论是别人评论博主
//发表评论，需要post指定chapter的ID
//请求需要chapterId,targetUser,和自己的UID:creator
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
            msg:"评论成功",
            createTime:Date.now()
        })
    }).catch(function(e){
        console.log("SOMETHING BROKE:",e);
    })
})


//commentId,chapterId,req.cookie
router.post("/delete",function(req,res,next){
    var UID=req.cookies.UID||"";
    let {commentId,chapId}=req.body;
    
    if(UID){
        Comment.findById(commentId).populate({path:"beReplied",select:"_id"}).then(function(_com){
            var pros=_com.beReplied.map((_reply)=>{
                return Reply.findByIdAndRemove(_reply._id.toString());
            })
            // 
            return Promise.all([...pros,_com,Chapter.findById(chapId).populate({path:"comments",select:"_id"})]);
        }).then(function(data){
            var _chap=data[data.length-1];
            var _com=data[data.length-2];
            let {comments}= _chap;
            for(var index in comments){
                if(comments[index]._id.toString()===commentId){
                    _chap.comments.splice(index,1);
                    break;
                }
            }
            return Promise.all([_chap.save(),_com.remove()]);
        }).then(function(){
            console.log("All Success!!");
            res.send({
                status:"200",
                msg:"删除评论成功"
            })
        })

    }else{
        res.send({
            status:"504",
            msg:"Please login first"
        })
    }
})

module.exports=router;