<template>
    <div class="editor_root_content">
        <div class="wrap">
          <el-input
            placeholder="写点什么吧..."
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
      if (content && title) {
        axios
          .post("/chapter/publish", {
            content,
            title
          })
          .then(function(result) {
            if (result.data.status === "200") {
              Bus.$emit("refresh",result.data.msg);
              _this.editor.txt.html("");
              _this.title='';
              // Bus.$emit("popup", result.data.msg);
            }
          });
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
    editor.customConfig.showLinkImg = false;
    editor.create();
    this.editor = editor;
  },
  computed:{
    canPublish:function(){
      if(this.editorContent.length>0&&this.title.length>0){
        return false
      }else{
        return true
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
  .post_area{
    margin-top: 20px;
    display: flex;
    // align-items: right;
    justify-content: flex-end;
    .size_limit{
      margin:0 20px;
      font-size: 32px;
      color:#9c9c9c;
      sup{
        font-size:20px;
        color:#779e00;
      }
      small{
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