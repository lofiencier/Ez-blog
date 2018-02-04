//查看用户所有的chapters-comments-replies
//sort by createTime

var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var schemas = require("../models/schemas");
var _User = schemas.User;
var Chapter=schemas.Chapter;
var moment=require("moment");

router.post("/",function(req,res,next){
    var uid=req.body.UID;
    if(uid){
        Chapter.find({creator:uid}).sort({"createTime":-1}).populate({
            path:"comments",
            // select:"-_id",
            populate:[{ 
                path:"creator",
                select:"nickname imgUrl"
            },{
                path:"targetUser",
                select:"nickname"
            },{
                path:"beReplied",
                populate:[{
                    path:"replier",
                    select:"nickname imgUrl"
                },{
                    path:"beReplier",
                    select:"nickname"
                }]
            }]
        }).then(function(chaps){
            return Promise.all([chaps,_User.findById(uid)])
        }).spread(function(chaps,user){
            console.log(user.createTime);
            res.send({
                status:"200",
                    _id:user._id,
                    createTime:user.creatTime,
                    imgUrl:user.imgUrl,
                    nickname:user.nickname,
                    description:user.description,
                    chapters:chaps
            })
        })
    }else{
        res.send({
            status:"504",
            msg:"missing user ID"
        })
    }
})


router.post("/update",function(req,res,next){
    var id=req.cookies.UID||"";
    let {imgUrl,nickname,description}=req.body;
    if(id){
        _User.findByIdAndUpdate(id, { $set: {
            nickname:nickname,
            imgUrl:imgUrl,
            description:description
        }}, { new: true }, function (err, user) {
            if (err) return handleError(err);
            res.send({
                status:"200",
                msg:"修改成功",
                user:{
                    nickname:user.nickname,
                    imgUrl:user.imgUrl,
                    description:user.description,
                    email:user.email,
                    createTime:user.creatTime
                }
            });
          });
    }else{
        res.send({
            status:"504",
            msg:"请先登陆"
        })
    }
})

module.exports=router;