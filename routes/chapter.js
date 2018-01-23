var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var schemas = require("../models/schemas");
var _User = schemas.User;
var Chapter=schemas.Chapter;

router.get('/', function (req, res, next) {
    var UID=req.cookies.UID||"";
    if (!UID){
        res.send({
            status:"503",
            msg:`Please login first,UID=${UID}`
        })
    }else{
        Chapter.find({creator:UID}).populate({
            path:"comments",
            select:"-_id",
            populate:[{ 
                path:"creator",
                select:"nickname"
            },{
                path:"targetUser",
                select:"nickname"
            },{
                path:"beRepied"
            }]
        }).then(function(result){
            res.send({
                status:"200",
                chaps:result
            })
        })
    }
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