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
    // Promise.all([
    //     _User.findById("5a60049483ca471ff414c833").exec(),
    //     _User.findById("5a6003c95e635223985fa75f").exec()
    // ]).spread(function(u1,u2){
    //     console.log("查询完成");
    //     res.send({
    //         status:"200",
    //         users:u1
    //     })
    // })
    res.send("w")
})

//commentId,targetId
//同时通知beReplyer被回复了___消息机制,待续
router.post("/publish",function(req,res,next){
    var info=req.body;
    var _reply=new Reply({
        content:info.content,
        createTime:info.createTime    
    });
    // _User.findById()
    //需要登录 取cUid
    var UID=req.cookies.UID||"";
    var targetUser=info.targetUser;
    Comment.findById(info.commentId).then(function(_com){
        console.log("查询comment成功");
        return Promise.all([
            _User.findById(UID),
            _User.findById(targetUser),
            _com
        ])
    }).spread(function(cUser,tUser,_com){
        _reply.replier=cUser;
        _reply.beReplier=tUser;
        console.log("查询用户成功");
        return Promise.all([_reply.save(),_com])
    }).spread(function(_reply,_com){
        console.log("push到comment成功");
        _com.beReplied.push(_reply);
        return _com.save();
    }).then(function(){
        console.log("all sucess!");
        res.send({
            status:"200",
            msg:"回复成功"
        })
    }).catch(function(e){
        console.log(e);
        res.send({
            status:"503",
            msg:e
        })
    })
    
})

//commentId,replyId
router.post("/delete",function(req,res,next){
    let {commentId,replyId}=req.body;
    Comment.findById(commentId).populate({
        path:"beReplied",
        select:"_id"
    }).then(function(_com){
        // console.log(_com.beReplied[0]._id.toString()===replyId);
        let {beReplied}=_com;
        for(var i in beReplied){
            if(beReplied[i]._id.toString()===replyId){
                console.log("找到匹配回复位置",i);
                _com.beReplied.splice(i,1);
                return Promise.all([_com.save(),Reply.findByIdAndRemove(replyId)]);
                break;
            }
        }
    }).spread(function(_com,_reply){
        res.send({
            status:"200",
            msg:"删除评论成功",
            reply:_reply
        })
    }).catch(function(err){
        res.send({
            status:"504",
            err:err
        })
    })
})
module.exports=router;