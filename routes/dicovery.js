var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var schemas = require("../models/schemas");
var _Chapter=schemas.Chapter;


//查询所有chapter,createTime.sort()
router.get("/dicovery",function(req,res,next){
    res.send({

    });
    
})