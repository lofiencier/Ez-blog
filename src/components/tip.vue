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
    }
  }
};
</script>

