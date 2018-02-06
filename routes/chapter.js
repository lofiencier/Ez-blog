var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var schemas = require("../models/schemas");
var _User = schemas.User;
var Chapter=schemas.Chapter;
var Reply=schemas.Reply;
var Comment=schemas.Comment;

router.get('/', function (req, res, next) {
    var UID=req.query.UID;
    if (!UID){
        res.send({
            status:"503",
            msg:`Please login first,UID=${UID}`
        })
    }else{
        Chapter.find({creator:UID}).sort({"createTime":-1}).populate({
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
});

//chapId,
router.post("/delete",function(req,res,next){
    var UID=req.cookies.UID;
    var chapId=req.body.chapId;
    _User.findById(UID).then(function(user){
        // res.send(user);
        //找到自己,遍历此chaps
        //找到某篇文章,从user删除，update此user
        //remove此文章
        
        console.log("找到用户"+UID);
        for (let index in user.chapters){
            if(chapId==user.chapters[index]){
                //remove此文章id
                // user.chapters[id]
                user.chapters.splice(index,1);
                console.log("找到User内指定Chap，跳出循环"+index)
                break;
            }
        };
        console.log("这个的执行顺序不见得在前面吧")
        return Promise.all([
            Chapter.findById(chapId),
            user.save(),
            Comment.find({chapterId:chapId}),
            Reply.find({chapterId:chapId})
        ])
    }).spread(function(chap,user,comments,replies){
        var _comPro=comments.map(function(_com){
            return _com.remove();
        });
        var _rePro=replies.map(function(_reply){
            return _reply.remove();
        });
        var promiseAll=_comPro.concat(_rePro);
        promiseAll.push(chap.remove());
        console.log("User更新完成，chap查找完成");
        return Promise.all(promiseAll);
    }).spread(function(){
        console.log("文章下的评论已删除");
        res.send({
            status:"200",
            msg:"文章删除成功"
        })
    }).catch(function(e){
        console.log(e);
        res.send({
            status:"503",
            err:e
        })
    })
})
module.exports=router;

//nest
//删除user，user创建的chaps/comments/replies要删除 
//删除chap，user里的chaps要删除
///