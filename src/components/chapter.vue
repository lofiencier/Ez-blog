<template>
    <div class="single_charter">
        <p>{{text}}</p>
    </div>
</template>

<script>
export default {
  data() {
    return {
      text:
        "想学习更多 webpack 的知识，请移步它们的官方文档以及 webpack le想学习更多 webpack 的知识想学习更多 webpack 的知识想学习更多 webpack 的知识arning academy。在 webpack 中，每个模块被打包到 bundle 之前都由一个相应的“loader”来转换，Vue 也提供 vue-loader 插件来执行 .vue 单文件组件 的转换。"
    };
  }
};
</script>

<style lang="less">
.single_charter {
  margin:40px 0;
  width: 100%;
  height: auto;
  background: #fff;
  color:#444;
  padding: 40px 0;
  box-shadow: rgba(0,0,0,.1) 0 2px ;
  position: relative;
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
</style>
