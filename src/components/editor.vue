<template>
    <div class="editor_root_content">
        <div class="wrap">
          <el-input
            placeholder="标题..."
            v-model="title"
            clearable>
          </el-input>
          <div id="editorElem" style="text-align:left"></div>
          <div class="post_area">
            <!-- <span class="size_limit"><sup>10</sup>/<small>28</small></span> -->
            <el-button type="primary" size="medium" :disabled="canPublish" @click="postToDB"  ref="button">发布</el-button>
          </div>
        </div>
    </div>
</template>

<script>
import E from "wangeditor";
import axios from "axios";
import Bus from "./bus";
import {getCookie} from "./util"

export default {
  name: "editor",
  data() {
    return {
      editorContent: "",
      title: "",
      eidtor: new Object()
    };
  },
  methods: {
    postToDB: function() {
      // alert(this.editorContent);
      var content = this.editorContent;
      // console.log(this);
      var title = this.title;
      var _this = this;
      var loged=localStorage.getItem("loged");
      var cookie=getCookie("UID");
      
      if (content && title) {
        if(loged&&cookie){
          axios
          .post("/chapter/publish", {
            content,
            title
          })
          .then(function(result) {
            if (result.data.status === "200") {
              Bus.$emit("refresh", result.data.msg);
              _this.editor.txt.html("");
              _this.title = "";
              // Bus.$emit("popup", result.data.msg);
            }
          });
        }else{
          Bus.$emit("err","请先登录");
        }
      } else {
        console.warn("HERE SHOW YOUR BOX_E");
        Bus.$emit("popup", "缺少参数");
      }
    }
  },
  mounted() {
    var editor = new E("#editorElem");
    editor.customConfig.onchange = html => {
      //需要写个正则?

      this.editorContent = html;
    };
    // editor.customConfig.uploadImgShowBase64 = true;   // 使用 base64 保存图片
    editor.customConfig.uploadImgServer = "/upload/images";
    editor.customConfig.showLinkImg = false;
    editor.customConfig.debug = true;
    // editor.customConfig.uploadImgHeaders = {
    // // 'Accept': 'text/x-json',
    //  'Content-Type': 'multipart/form-data;boundary=----WebKitFormBoundaryWbSfsKDrlpSNdBHD'
    // };
    editor.customConfig.uploadFileName = "images";
    editor.customConfig.uploadImgHooks = {
      customInsert: function (insertImg, result, editor) {
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
        if(result.status==='200'){
          Bus.$emit("popup",result.msg);
          var url = result.url
          insertImg(url)
        }else{
          Bus.$emit("err",'图片上传失败')
        }

        // result 必须是一个 JSON 格式字符串！！！否则报错
      }
    };
    editor.create();
    this.editor = editor;
    console.log(editor);
  },
  computed: {
    canPublish: function() {
      if (this.editorContent.length > 0 && this.title.length > 0) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.editor_root_content {
  background: #fff;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.1) 0 2px;
  .wrap {
    margin: 30px;
  }
  &::before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    left: -25px;
    top: 0px;
    border-top: 25px solid rgb(255, 255, 255);
    border-left: 25px solid transparent;
  }
  .post_area {
    margin-top: 20px;
    display: flex;
    // align-items: right;
    justify-content: flex-end;
    .size_limit {
      margin: 0 20px;
      font-size: 32px;
      color: #9c9c9c;
      sup {
        font-size: 20px;
        color: #779e00;
      }
      small {
        font-size: 20px;
      }
    }
  }
}
.editor_title {
  box-sizing: border-box;
  width: 100%;
  height: 40px;
}
</style>