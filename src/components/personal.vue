<template >
  <div class="personal_content" v-if="show">
    <div class="info_wrap">
      <div class="avatar_box">
      <el-upload
          class="avatar-uploader"
          action="/upload/images"
          name="images"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" ref="image">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span>点击修改头像</span>
    </div>
    <div class="info_submit">
        <span>确认修改</span>
      </div>
      <a class="close_box" href="javascript:void(0)" @click="toggleShow">
        <i class="el-icon-close"></i>
      </a>
    </div>
  </div>
</template>



<script>
import Bus from "./bus";
export default {
  data() {
    return {
      show: false,
      imageUrl: "./static/images/anymous.svg"
    };
  },
  mounted: function() {
    Bus.$on("showInfoChange", this.toggleShow);
  },
  methods: {
    toggleShow: function() {
      this.show = !this.show;
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload: function(file) {
      var _this=this;
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        // this.$message.error("上传头像图片只能是 JPG 格式!");
        Bus.$emit('err',"头像图片只能是JPG格式")
      }
      if (!isLt2M) {
        // this.$message.error("上传头像图片大小不能超过 2MB!");
        Bus.$emit("err","头像图片大小不能超过2MB")
      }
      return new Promise(function(resolve,reject){
        _this.readImageSize(file,resolve,reject,isJPG,isLt2M);
      })
    },
    readImageSize: function(file,resolve,reject,isJPG,isLt2M) {
      var imageUrl = URL.createObjectURL(file);
      var image = new Image();
      image.onload = function() {
        var width = image.width;
        var height = image.height;
        var fileSize = image.fileSize;
        const isSquare=(width===height);
        if(!isSquare){
          Bus.$emit("err","请上传正方形图片");
        }
        if(isJPG&&isLt2M&&isSquare){
          resolve();
        }else{
          reject();
        }
      };
      image.src = imageUrl;
    }
  }
};
</script>



<style lang="less">
.personal_content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  .info_wrap {
    margin: 0 auto;
    border-radius: 4px;
    position: relative;
    min-width: 400px;
    min-height: 380px;
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.5) 0 6px 12px;
  }
  .close_box {
    position: fixed;
    top: 10px;
    right: 10px;
    color: #fff;
    font-size: 28px;
    width: 28px;
    height: 28px;
  }
  .info_submit {
    position: absolute;
    width: 100%;
    height: 50px;
    bottom: 0;
    cursor: pointer;
    span {
      display: block;
      height: 100%;
      text-align: center;
      background: #ff463e;
      color: #fff;
      border-radius: 0 0 4px 4px;
      line-height: 50px;
      &:hover {
        background: #ff5952;
      }
      &:active {
        background: #f43830;
      }
    }
  }
}
.avatar_box {
  width: 100%;
  height: 160px;
  text-align: center;
  color: #444;
  font-size:14px;
  .avatar-uploader .el-upload {
    border: 2px solid #fff;
    width: 120px;
    margin-top: -60px;
    // margin:0 auto;
    border-radius: 60px;
    background: #fff;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    img {
      width: 100%;
      height: auto;
    }
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
}
</style>

