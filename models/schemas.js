var mongoose =require("mongoose");
var Schema=mongoose.Schema;

var UserSchema=new Schema({
    name:String,
    creatTime:Number,
    chapterIds:Array,
    imgUrl:String
});

var ChapterSchema=new Schema({
    title:String,
    content:String,
    comments:Array,
    creator:Number,
    createTime:Number
})

var CommentSchema=new Schema({
    uid:Number,
    beReplied:Array,
    content:String,
    createTime:Number
})

var ReplySchema=new Schema({
    uid:Number,
    targetUser:Number,
    content:String,
    createTime:Number
})

var User=mongoose.model('user',UserSchema);
var Chapter=mongoose.model('chapter',ChapterSchema);
var Comment=mongoose.model('comment',CommentSchema);
var Reply=mongoose.model('beReply',ReplySchema);

module.exports={
    User,
    Chapter,
    Comment,
    Reply
}