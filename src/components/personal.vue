<template >
  <div class="personal_content" v-if="show">
    
    <div class="info_wrap">
      <el-button size="small" type="primary">确定</el-button>
      <el-button size="small">取消</el-button>
    </div>
  </div>
</template>

<style lang="less">
.personal_content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  .info_wrap {
    margin: 0 auto;
    border-radius: 10px;

    min-width: 300px;
    min-height: 360px;
    background: #fff;
  }
}
</style>

<script>
export default {
  data(){
    return{
      show:false
    }
  }
}
</script>
