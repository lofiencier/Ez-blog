var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
//登录
// var Login_File = path.join(__dirname, 'demo/tongxunlu.json'); 
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
// 图片上传
router.post('/images', function (req, res) {

    // don't forget to delete all req.files when done 
    // 生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({ uploadDir: './static/upload/images/' });

    //上传完成后处理
    form.parse(req, function (err, fields, files) {
        var obj = {};
        var filesTmp = JSON.stringify(files, null, 2);
        if (err) {
            console.log('parse error: ' + err);
        }
        else {

            console.log('parse files: ' + filesTmp);
            console.log(files);
            var inputFile = files.images[0];
            var uploadedPath = inputFile.path;
            var dstPath = './static/upload/images/' + inputFile.originalFilename;
            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, function (err) {
                if (err) {
                    console.log('rename error: ' + err);
                    res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' });
                    res.end("{'status':504, 'message': '上传失败！'}");
                } else {
                    console.log('rename ok');
                    // res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' });
                    // res.end("{'status':400, 'message': '上传成功！,'url':dstPath}");
                    res.send({
                        status:"200",
                        msg:"上传成功",
                        url:dstPath
                    })
                }
            });
        }
    });
    
});
module.exports = router;
