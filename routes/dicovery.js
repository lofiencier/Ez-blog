var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var schemas = require("../models/schemas");
var _Chapter=schemas.Chapter;

router.get("/dicovery",function(req,res,next){
    res.send({

    });
    
})