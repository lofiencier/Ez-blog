var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var bluebird=require("bluebird");
mongoose.Promise=bluebird;
var schemas = require("../models/schemas");
var Test=schemas.Test;
var _User=schemas.User;

router.get('/', function (req, res, next) {
    
});

module.exports=router;

