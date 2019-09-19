<template>
  <div class="order-container">
    <div v-if="!isLogin">
      <van-button @click="navigateToLogin">登录</van-button>
    </div>
    <div v-else>
      <van-tabs :active="active"
                custom-class="van-tabs__custom"
                @change="onChange">
        <van-tab
          tab-class="van-tabs__custom"
          title="全部">
          <div class="order-list">
            <order-card></order-card>
          </div>
        </van-tab>
        <van-tab title="待评价">
          <div class="order-list">
          </div>
        </van-tab>
        <van-tab title="待付款">

          <div class="order-list">

          </div>

        </van-tab>
      </van-tabs>

    </div>

  </div>

</template>

<script>
  import OrderCard from '@/components/OrderCard';
  export default {

  components: {
    OrderCard
  },

  data() {
    return {
      active:0,
      isLogin:false

    }

  },
  methods: {
    onChange(event) {
      console.log(event)

    },
    navigateToLogin() {
      var url = "../login/main";
      console.log("url",url);
      wx.navigateTo({
        url
      });
    }
  },
    onShow() {
    console.log("this.isLogin", this.isLogin)
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
