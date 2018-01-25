<template>
    <div class="editor_root_content">
        <div class="wrap">
          <input type="text" placeholder="标题(可不填)" class="editor_title" autocomplete="flase" v-model="title">
          <div id="editorElem" style="text-align:left"></div>
          <button @click="postToDB">提交</button>
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
      eidtor:new Object
    };
  },
  methods: {
    postToDB: function() {
      // alert(this.editorContent);
      var content = this.editorContent;
      // console.log(this);
      var title = this.title;
      var _this =this;
      console.log(this.eidtor);
      if (content && title) {
        axios
          .post("/chapter/publish", {
            content,
            title
          })
          .then(function(result) {
            if (result.data.status === "200") {
              Bus.$emit("refresh");
              _this.editor.txt.html('');
              Bus.$emit("popup",result.data.msg);
            }
          });
      }else{
        console.warn("HERE SHOW YOUR BOX_E");
        Bus.$emit("popup","缺少参数");
      }
    }
  },
  mounted() {
    var editor = new E("#editorElem");
    editor.customConfig.onchange = html => {
      this.editorContent = html;
    };
    editor.create();
    this.editor=editor;
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
}
.editor_title {
  box-sizing: border-box;
  width: 100%;
  height: 40px;
}
</style>