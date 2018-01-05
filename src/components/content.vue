<template>
  <div class="content">
      <Chapter/>
      <Chapter/>
      <Chapter/>
      <Chapter/>
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
        height: auto;
        flex: 1 1 auto;
        margin-left: 40px;
        }
</style>
