var mongoose =require("mongoose");
var Schema=mongoose.Schema;

var UserSchema=new Schema({
    email:String,
    nickname:String,
    creatTime:Number,
    chapterIds:Array,
    imgUrl:String,
    password:String,
    tests:[{type:Schema.Types.ObjectId,ref:"test"}]
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

var testSchema=new Schema({
    name:{type:String,required:true},
    author:{type:Schema.Types.ObjectId,ref:"user"},
    content:String
})
var User=mongoose.model('user',UserSchema);
var Chapter=mongoose.model('chapter',ChapterSchema);
var Comment=mongoose.model('comment',CommentSchema);
var Reply=mongoose.model('beReply',ReplySchema);
var Test=mongoose.model("test",testSchema);
module.exports={
    User,
    Chapter,
    Comment,
    Reply,
    Test
}