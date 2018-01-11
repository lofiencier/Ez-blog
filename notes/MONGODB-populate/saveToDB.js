var Post = require('./model').Post;
var Comment = require('./model').Comment;

var tom = new User({name: 'Tom', age: 19});
//新建用户
var test = new Post({title: 'test', content: 'wakaka'});
//新建发布
var walala = new Comment({content: 'walala'});
//新建评论
tom.save().then(function(user) {
    //保存这个user
  test.author = user;
  //保存这个user到此文章
  walala.author = user;
  //保存这个user到这个评论
  return Promise.all([test.save(), walala.save(), user]);
  //返回一个promise.all,所以这个user到底怎么回事
}).spread(function(post, comment, user) {
    //分散返回结果,promise.all([],function)?
  user.posts.push(post);
  //保存此文章到user
  user.comments.push(comment);
  //保存此评论到user
  post.comments.push(comment);
  //保存此评论到文章，此处post即为上面声明的test
  return Promise.all([user.save(), post.save()]);
}).spread(function() {
  console.log('success');
}).catch(function(reason) {
  console.log(reason);
});