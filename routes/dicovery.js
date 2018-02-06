var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var schemas = require("../models/schemas");
var Chapter=schemas.Chapter;
var _User=schemas.User;


//查询所有chapter,createTime.sort()
router.get("/",function(req,res,next){
    var limit=req.query.limit-0||10;
    var offset=req.query.offset-0||0;
    console.log(typeof offset);
    var options = {
        // select:   'title date author',
        sort:     { createTime: -1 },
        populate: [{
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
        },{
            path:"creator",
            select:"nickname imgUrl"
        }],
        lean:     true,
        offset:   offset*limit, 
        limit:    limit
    };
    Chapter.paginate({},options).then(function(result){
        res.send({
            status:"200",
            chaps:result.docs,
            msg:"获取成功",
            total:result.total,
            offset:offset,
            limit:result.limit
        })
    }).catch(function(err){
        res.send({
            status:"503",
            error:err
        })
    })
    
})

module.exports=router;