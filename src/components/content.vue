<template>
  <div class="content">
      <Chapter/>
  </div>
</template>

<script>
import Chapter from "./chapter.vue"

export default {
  components:{
      Chapter
  }
}
</script>

<style lang="less">
    .content{
        max-width:1000px;
        height: auto;
        margin:0 auto;
    }
</style>
