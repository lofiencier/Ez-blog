<template>
    <div class="tip_cover" v-if="msg">
        
    </div>
</template>

<script>
import Bus from "./bus";
import {Message} from "element-ui"
export default {
  mounted() {
    Bus.$on("popup", this.popup);
    Bus.$on('err',this.errorHandler);
  },
  data() {
    return {
      msg: ""
    };
  },
  methods: {
    popup: function(msg) {
      Message.success({
          message:msg,
          center:true
      })
    },
    errorHandler:function(msg){
      Message.error({
        message:msg,
        center:true
      })
    }
  }
};
</script>

