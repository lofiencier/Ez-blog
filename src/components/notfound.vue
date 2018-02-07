<template>
  <div class="err">
      <div class="err_img">

      </div>
  </div>
</template>


<style lang="less">
    .err{
      position: fixed;
      width: 100%;
      height:100%;
      // background:#333;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      .err_img{
        width:658px;
        height:386px;
        background:url(/static/images/404.jpg) no-repeat center;
      }
    }
</style>
