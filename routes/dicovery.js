var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var schemas = require("../models/schemas");
var Chapter=schemas.Chapter;
var _User=schemas.User;


//查询所有chapter,createTime.sort()
router.get("/",function(req,res,next){
    Chapter.find().sort({"createTime":-1}).populate({
        path:"comments",
        // select:"-_id",
        populate:[{ 
            path:"creator",
            select:"nickname"
        },{
            path:"targetUser",
            select:"nickname"
        },{
            path:"beReplied",
            populate:[{
                path:"replier",
                select:"nickname"
            },{
                path:"beReplier",
                select:"nickname"
            }]
        }]
    }).then(function(result){
        res.send({
            status:"200",
            chaps:result,
            msg:"获取成功"
        })
    }).catch(function(err){
        res.send({
            status:"503",
            error:err
        })
    })
    
})

module.exports=router;