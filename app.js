var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');
var mongoose = require("mongoose");
var apicache = require("apicache");


let cache = apicache.middleware;



mongoose.connect("mongodb://localhost:27017/blog");
var db=mongoose.connection;
db.on("err",console.error.bind(console,"CONNECT ERROR:"));
db.once("open",function(){
  console.log("MONGO READY");
})

var discovery=require("./routes/dicovery");
var signup=require("./routes/signup");
var login=require("./routes/login");
var _test=require("./routes/test");
var chapter=require("./routes/chapter");
var comment=require("./routes/comment");
var reply =require("./routes/reply");
var upload =require("./routes/upload");
var user =require("./routes/user");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//缓存设置
const onlyStatus200 = (req, res)=>{
  
  return res.statusCode===200
}
// app.use(cache("2 minutes", onlyStatus200));

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/discovery",discovery);
app.use("/signup",signup);
app.use("/login",login);
app.use("/test",_test);
app.use("/chapter",chapter);
app.use("/comment",comment);
app.use("/reply",reply);
app.use("/upload",upload);
app.use("/user",user);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
