<template>
  <div class="my-container">

    <div class="my-profile">
      <div class="my-basic-info">
        <div class="my-basic-info__Avatar" @click="navToSetting">
          <img :src="basicInfo.avatar" class="circleImg">
        </div>

        <div class="my-basic-info__content">
          <div>{{basicInfo.name}}</div>
          <van-tag color="black">{{basicInfo.level}}</van-tag>
        </div>
        <div class="my-basic-info__go">
          <van-button round color="grey"
                      custom-class="mini-button"
                      size="mini">开通星球会员></van-button>
        </div>
      </div>
      <div class="my-wallet-info">

        <div class="my-wallet-info__style">
          <div style="font-weight: 600;font-size: 15px;"> {{walletInfo.balance}} 元</div>
          <div style="font-weight: lighter;font-size: 10px;padding: 5px;">余额</div>
        </div>

        <div class="my-wallet-info__style">
          <div style="font-weight: 600;font-size: 15px;"> {{walletInfo.coupon}} 个</div>
          <div style="font-weight: lighter;font-size: 10px;padding: 5px;">优惠券</div>

        </div>

        <div class="my-wallet-info__style">
          <div style="font-weight: 600;font-size: 15px;"> {{walletInfo.point}} 分</div>
          <div style="font-weight: lighter;font-size: 10px;padding: 5px;">积分</div>
        </div>



      </div>
    </div>

    <div class="my-operation">
      <van-cell-group>
        <van-cell title="收货地址管理" icon="location-o" is-link />
        <van-cell title="积分兑换" icon="location-o" is-link />
        <van-cell title="我的会员卡" icon="location-o" is-link />
        <van-cell title="帮助中心" icon="location-o" is-link link-type="navigateTo"
                  url="/pages/help/main"/>
      </van-cell-group>
    </div>

    <div class="my-customer-phone">
      <van-cell title="客服电话 138-1740-9664" label="服务时间：9:00-21:00" icon="phone-o" />
    </div>

  </div>

</template>

<script>



export default {

  components: {
  },

  data() {
    return {
      basicInfo: {
        avatar:"https://t12.baidu.com/it/u=541581695,4055461334&fm=76",
        name:"宇",
        level:"新朋友"
      },

      walletInfo : {
        balance: 100,
        coupon:2,
        point : 100
      }

    }

  },
  methods: {
    navToSetting() {
      let url = "../mysetting/main" ;
      console.log("url",url)
      wx.navigateTo({
        url
      });
    }
  }



}
</script>

<style scoped>
  .my-container {
    position:relative;
  }
  .circleImg {
    border-radius: 30px;
    width:60px;
    height:60px;
  }

  .my-profile {
    position: relative;
    margin-top: 10px;
  }
  .my-basic-info {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
  }

  .my-basic-info__Avatar {
    padding: 10px 15px;
  }

  .my-basic-info__content {
    flex:auto;
  }
  .my-basic-info__go {
    padding: 10px 15px;
  }

  .my-wallet-info {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: white;
  }
  .my-wallet-info__style {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .my-operation {
    position: relative;
    margin-top: 10px;
  }
</style>

<style lang="wxss">
  page{
    height: 100%;
    background-color:#F4F4F4 !important;
  }
</style>
<style lang="scss">
  .mini-button {
    width: 80px !important;
  }
</style>
