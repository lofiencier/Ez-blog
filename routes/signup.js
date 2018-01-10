var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var schemas = require("../models/schemas");
var _User = schemas.User;
var crypto = require("crypto");

router.get('/', function (req, res, next) {
    var info = req.query;
    let { email, password, imgUrl } = info;
    _User.find({ "email": email }, function (err, users) {
        if (users.length > 0) {
            res.send({
                status: "506",
                msg: "User exist"
            })
        } else {
            if (email != undefined && password != undefined && imgUrl != undefined) {
                var md5sum = crypto.createHash('md5')
                md5sum.update(req.query.password);
                var newUser = new _User({
                    email: info.email,
                    nickname: info.nickname || "Anymous",
                    creatTime: info.creatTime || Date.now(),
                    chapterIds: [],
                    imgUrl: info.imgUrl,
                    password: md5sum.digest('hex')
                });
                newUser.save().then(() => {
                    res.send({
                        status: "200",
                        msg: "User create"
                    });
                }).catch((e) => {
                    res.send({
                        status: "504",
                        msg: e
                    })
                })
            } else {
                res.send({
                    status: "503",
                    msg: "Missing params"
                })
            }
        }
    })
});


module.exports = router;
