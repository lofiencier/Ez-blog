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
  width: 100px;
  height: 100px;
  img{
      width: 100%;
      height: auto;
  }
}
</style>
