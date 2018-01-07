<template>
  <span><a href="#">{{msg}}</a></span>
</template>

<script>
export default {
  props:["msg"]
}
</script>

<style lang="less" scoped>
    span{
        display: inline-block;
        &::before,&::after{
            content:"";
            width: 100px;
            height: 1px;
            background:#aaa;
        }
        
    }
</style>
