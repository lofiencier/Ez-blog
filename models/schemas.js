var mongoose =require("mongoose");
var Schema=mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');


var UserSchema=new Schema({
    email:{type:String,unique:true,required:true},
    nickname:String,
    creatTime:Number,
    chapters:[{type:Schema.Types.ObjectId,ref:"chapter"}],
    imgUrl:String,
    password:{type:String,required:true},
    description:String,
    
    msg:[{type:Schema.Types.ObjectId,ref:"beReply"}]
});

var ChapterSchema=new Schema({
    title:String,
    content:String,
    comments:[{type:Schema.Types.ObjectId,ref:"comment"}],
    creator:{type:Schema.Types.ObjectId,ref:"user"},
    createTime:Number
});
ChapterSchema.plugin(mongoosePaginate);

var CommentSchema=new Schema({
    // uid:Number,
    creator:{type:Schema.Types.ObjectId,ref:"user"},
    beReplied:[{type:Schema.Types.ObjectId,ref:"beReply"}],
    targetUser:{type:Schema.Types.ObjectId,ref:"user"},
    chapterId:String,
    content:String,
    createTime:Number
})

var ReplySchema=new Schema({
    replier:{type:Schema.Types.ObjectId,ref:"user"},
    beReplier:{type:Schema.Types.ObjectId,ref:"user"},
    chapterId:String,
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