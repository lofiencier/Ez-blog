<template>
  <div class="content">
      <Editor/>
      <Chapter/>
      <Chapter/>
      <Chapter/>
      <Chapter/>
      <Chapter/>
  </div>
</template>

<script>
import Chapter from "./chapter.vue"
import Editor from "./editor"

export default {
    data(){
        return{
            text:""
        }
    },
  components:{
      Chapter,Editor
  }
}
</script>

<style lang="less">
    .content{
        height: auto;
        flex: 1 1 auto;
        margin-left: 40px;
        position: relative;
        }
</style>
