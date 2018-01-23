<template>
    <div class="editor_root_content">
        <div class="wrap">
          <input type="text" placeholder="标题(可不填)" class="editor_title" autocomplete="flase">
          <div id="editorElem" style="text-align:left"></div>
        </div>
    </div>
</template>

<script>
import E from "wangeditor";

export default {
  name: "editor",
  data() {
    return {
      editorContent: ""
    };
  },
  methods: {
    getContent: function() {
      alert(this.editorContent);
    }
  },
  mounted() {
    var editor = new E("#editorElem");
    editor.customConfig.onchange = html => {
      this.editorContent = html;
    };
    editor.create();
  }
};
</script>

<style lang="less" scoped>
.editor_root_content {
  background: #fff;
  overflow: hidden;
  box-shadow: rgba(0,0,0,.1) 0 2px ;
  .wrap{
    margin:30px;
  }
  &::before{
    content:"";
    position: absolute;
    width: 0;
    height: 0;
    left:-25px;
    top:0px;
    border-top: 25px solid rgb(255, 255, 255);
    border-left: 25px solid transparent; 
  }
}
.editor_title{
  box-sizing: border-box;
  width:100%;
  height: 40px;
}

</style>