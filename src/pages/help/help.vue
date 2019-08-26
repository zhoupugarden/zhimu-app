<template>
  <div class="help-container">
    <van-cell-group>
      <van-cell title="余额问题" is-link link-type="navigateTo"
                url="/pages/balancequestion/main"/>
      <van-cell title="优惠券问题" is-link link-type="navigateTo"
                url="/pages/couponquestion/main"/>
      <van-cell title="会员问题" is-link link-type="navigateTo"
                url="/pages/memberquestion/main"/>
      <van-cell title="投诉意见" is-link link-type="navigateTo"
                url="/pages/complaint/main"/>
    </van-cell-group>
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

<style scoped>
  page {
    height: 100%;
  }

  .order-container {
    position: relative;
    width: 100%;
    height:100%;
  }
  .order-list {
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
    background-color:#F4F4F4 !important;
  }
</style>
