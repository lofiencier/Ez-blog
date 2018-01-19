var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var bluebird=require("bluebird");
mongoose.Promise=bluebird;
var schemas = require("../models/schemas");
var Test=schemas.Test;
var _User=schemas.User;
var Comment=schemas.Comment;

router.get('/', function (req, res, next) {
    _User.find({"_id":"5a60049483ca471ff414c833"}).populate({
        path:"chapters",
        populate:{
            path:"comments",
            model:"comment",
            populate:{
                path:"beReplied",
                model:"beReply"
            }
        }
    }).then(function(dt){
        console.log(dt);
        res.send({
            status:"200",
            user:dt
        })
    })
});

module.exports=router;

