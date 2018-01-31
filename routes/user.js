//查看用户所有的chapters-comments-replies
//sort by createTime

var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var schemas = require("../models/schemas");
var _User = schemas.User;

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
                    createTime:user.createTime
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