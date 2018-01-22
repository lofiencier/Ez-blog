var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var schemas = require("../models/schemas");
var Chapter=schemas.Chapter;
var _User=schemas.User;


//查询所有chapter,createTime.sort()
router.get("/",function(req,res,next){
    Chapter.find({}).limit(10).sort({createTime:-1}).then(function(chaps){
        res.send({
            status:"200",
            chaps:chaps
        })
    }).catch(function(err){
        res.send({
            status:"503",
            error:err
        })
    })
    
})

module.exports=router;