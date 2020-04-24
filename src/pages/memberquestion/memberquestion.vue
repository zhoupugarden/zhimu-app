<template>
  <div class="memberquestion-container">

    <div style="font-weight: bold; font-size: 14px;padding-top: 20px">
      Q1:如何使用余额？
    </div>
    <div style="font-size: 14px; padding-top: 20px">
      正常下单时可以再订单结算页面填写要使用的余额，也可以联系客服进行下单
    </div>

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
 @import "memberquestion.scss";
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
