<template>
  <div class="avatar">
      <img src="../assets/images/avatar.jpg" alt="">
  </div>
</template>

<script>
export default {
  name: "Avatar",
  props:["imgUrl"]
};
</script>

<style lang="less">
.avatar {
  max-width:100px;
  height: 100px;
  flex: 1 0 auto;
  img{
      width: 100%;
      height: auto;
  }
}
</style>
