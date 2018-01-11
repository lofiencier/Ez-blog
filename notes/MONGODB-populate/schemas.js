var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/population');

var Schema = mongoose.Schema;
var userSchema = new Schema({
  name: String,
  age: Number,
  posts: [{type: Schema.Types.ObjectId, ref: 'post'}],
  comments: [{type: Schema.Types.ObjectId, ref: 'comment'}]
});
var User = mongoose.model('user', userSchema);
//user包含post(文章？）和comment

var postSchema = new Schema({
  title: String,
  content: String,
  author: {type: Schema.Types.ObjectId, ref: 'user'},
  comments: [{type: Schema.Types.ObjectId, ref: 'comment'}]
});
var Post = mongoose.model('post', postSchema);
//post包含user部分信息
//包含comment

var commentSchema = new Schema({
  content: String,
  author: {type: Schema.Types.ObjectId, ref: 'user'}
})
var Comment = mongoose.model('comment', commentSchema);
//comment包含user信息，

exports.User = User;
exports.Post = Post;
exports.Comment = Comment;