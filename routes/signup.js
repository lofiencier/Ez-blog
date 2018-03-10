var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var schemas = require("../models/schemas");
var _User = schemas.User;
var crypto = require("crypto");

router.post('/', function (req, res, next) {
    var info = req.body;
    console.log(req.body);
    let { email, password } = info;
    _User.find({ "email": email }, function (err, users) {
        if (users.length > 0) {
            res.send({
                status: "506",
                msg: "User exist"
            })
        } else {
            if (email != undefined && password != undefined) {
                // var md5sum = crypto.createHash('md5')
                // md5sum.update(req.body.password);
                var newUser = new _User({
                    email: info.email,
                    nickname: info.nickname || "Anymous",
                    creatTime: info.creatTime || Date.now(),
                    chapterIds: [],
                    imgUrl: info.imgUrl||"./static/images/anymous.svg",
                    password: info.password
                });
                newUser.save().then((user) => {
                    res.set({
                        "Set-Cookie":`UID=${user._id}`
                    })
                    res.send({
                        status: "200",
                        msg: "User create",
                        // user:user
                        profile:{
                            nickname:user.nickname,
                            createTime:user.createTime,
                            email:user.email,
                            imgUrl:user.imgUrl,
                            UID:user._id
                        }
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

router.post("/logout",function(req,res,next){
    if(req.cookies.UID!=undefined&&req.cookies.UID.length>0){
        res.clearCookie("UID");
        res.send({
            status:"200",
            msg:"账号已退出"
        })
    }
})

router.post("/precheck",function(req,res,next){
    var email=req.body.email;
    _User.find({ "email": email },function(err,user){
        if(user.length>0){
            res.send({
                status:"503",
                msg:"此邮箱已被注册"
            })
        }else{
            res.send({
                status:"200",
                msg:"此邮箱可以注册"
            })
        }
    }).catch((e)=>{
        res.send({
            status:"503",
            msg:"此邮箱已被注册"
        })
    })
})

module.exports = router;
