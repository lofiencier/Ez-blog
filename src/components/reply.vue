<template>
  <div class="reply_content">
      <form class="reply_form" autocomplete="false" @submit="submitHandler">
          <input type="text" class="reply_input" placeholder="写点什么吧..." name="content">
          <input type="submit" class="reply_submit" value="回复">
      </form>
  </div>
</template>

<script>
export default {
  methods: {
    submitHandler: function(e) {
      var form = e.currentTarget;
      e.preventDefault();
      var content = form.content.value;
      console.log(this.creator, this.targetUser);
      return false;
    },
    postToDB: function(info) {}
  },
  props: ["creator", "targetUser"]
};
</script>

<style lang="less">
.reply_content {
  width: 100%;
  height: auto;
  .reply_form {
    display: flex;
    height: 28px;
    align-items: center;
  }
  .reply_input {
    box-sizing: border-box;
    height: 28px;
    flex: 1 0 auto;
    font-size: 12px;
    text-indent: 0.5em;
  }
  .reply_submit {
    // padding:4px 10px;
    padding: 6px 10px;
    background: #779e00;
    font-size: 12px;
    text-align: center;
    color: #fff;
    border: 0;
    &:hover {
      border: 0;
    }
  }
}
</style>
