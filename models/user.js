var mongoose = require("mongoose");
var models = require("./schemas");
var User = models.User;

module.exports = {
    createUser: function (info) {
        var user = new User({
            id: info.id,
            name: info.name,
            creatTime: info.createTime,
            chapterIds: info.chapterIds,
            imgUrl: info.imgUrl
        })
    }
}