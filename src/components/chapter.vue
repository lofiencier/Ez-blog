<template>
    <div class="single_charter">
        <h1 class="title">HERE ARE TITLE</h1>
        <p>{{text}}</p>
        <div class="controls">
          <More msg="More"/>
          <span><a href="javascript:void(0)">编辑</a></span>
          <span><a href="#">评论</a></span>
          <span><a href="#">删除</a></span>
        </div>
        <div class="comment_wrap">
          <Comments/>
        </div>
    </div>
</template>

<script>
import Comments from "./comments.vue"
import More from "./more"
export default {
  data() {
    return {
      text:
        "想学习更多 webpack 的知识，请移步它们的官方文档以及 webpack le想学习更多 webpack 的知识想学习更多 webpack 的知识想学习更多 webpack 的知识arning academy。在 webpack 中，每个模块被打包到 bundle 之前都由一个相应的“loader”来转换，Vue 也提供 vue-loader 插件来执行 .vue 单文件组件 的转换。"
    };
  },
  components:{
    Comments,More
  }
};
</script>

<style lang="less">
.single_charter {
  margin:40px 0;
  padding:1px 0;
  width: 100%;
  height: auto;
  background: #fff;
  color:#444;
  box-shadow: rgba(0,0,0,.1) 0 2px ;
  position: relative;
  .title{
    margin:0;
    padding:1em 1em;
    display: flex;
    align-items: center;
    font-size: 20px;
    &::before{
      content:"文章";
      color:#fff;
      background:#779e00;
      font-size: 16px;
      padding:0 6px;
      margin-right: 10px;
    }
  }
  p{
    text-indent: 2em;
    line-height: 1.5em;
    margin:0 16px;
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
.controls{
  margin:20px 20px;
  position: relative;
  font-size: 12px;
  text-align: right;
  color:#aaa;
  span{
    margin:0 5px;
    a{
      color:#aaa;
    }
  }
}
.comment_wrap{
  height: auto;
  margin:20px 20px;
  border-top: 1px solid rgb(238, 238, 238);
}
</style>
