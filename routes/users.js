var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var schemas = require("../models/schemas");
var _User = schemas.User;

/* GET users listing. */
router.post('/', function (req, res, next) {
  var info = req.body;
  var newUser = new _User({
    name: info.name,
    creatTime: info.creatTime,
    chapterIds: [],
    imgUrl: info.imgUrl
  });
  newUser.save().then(() => {
    res.send("User Saved");
  })
});

module.exports = router;
