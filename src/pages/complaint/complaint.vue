<template>
  <div class="complaint-container">

    <div class="comlaint-type">
      <van-cell title="问题类型" is-link />
    </div>

    <van-cell-group>
      <van-field
        :value="message"
        label="留言"
        type="textarea"
        placeholder="请输入留言"
        autosize
      />
    </van-cell-group>


    <van-cell-group>
      <van-field
        :value="contactName"
        required
        clearable
        label="用户名"
      />
      <van-field
        :value="contactPhoneNo"
        placeholder="请输入密码"
        label="联系电话"
        required
      />
    </van-cell-group>

    <van-button round type="primary">提交申请</van-button>

    <van-popup>

    </van-popup>


  </div>

</template>

<script>
  export default {

  components: {
  },

  data() {
    return {
      active:0

    }

  },
  methods: {
    onChange(event) {
      console.log(event)

    }
  }

}
</script>

<style lang="scss" scoped>
  .balancequestion-container {
    width: 80%;
    padding-left: 20px;
  }

</style>
<style lang="scss">
  .van-tabs__custom {
    width: 100%;
    height: 100%;
  }
</style>

<style lang="wxss">
  page{
    height: 100%;
    background-color:white !important;
  }
</style>
