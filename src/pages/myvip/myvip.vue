<template>
  <div class="myvip-container">

    <div class="myvip-header" >
      <div class="header-round-pic">
        <img :src="userInfo.avatarUrl" class="circleImg">
      </div>
      <div style="color: white; font-size: 14px; font-family: 'Microsoft YaHei'">
        {{userInfo.nickName}}
      </div>
      <div style="color: white; font-size: 10px; font-family: 'Microsoft YaHei'">
        (使用会员卡年均节省477元)
      </div>
      <div v-if="userInfo.level === 0">
        <van-button type="primary" size="small" @click="navigateToBuy">开通</van-button>
      </div>
      <div v-else>
        vip用户
      </div>

    </div>

    <div class="myvip-privilege">
      <div style="font-size: 18px; font-weight: bold; padding: 20px 0px;">会员特权</div>

      <div class="privilege-items">
        <div class="privilege-item" @click="showPopup(0)">
          <img src="../../asset/birth.png" class="privilege-icon">
          <div class="privilege-item-name">免邮卡</div>
          <div class="privilege-item-tip">每月两张</div>
        </div>
        <div class="privilege-item" @click="showPopup(1)">
          <img src="../../asset/coupon.png" class="privilege-icon">
          <div class="privilege-item-name">五倍积分</div>
          <div class="privilege-item-tip">多买多返</div>
        </div>
        <div class="privilege-item" @click="showPopup(2)">
          <img src="../../asset/point.png" class="privilege-icon">
          <div class="privilege-item-name">生日福利</div>
          <div class="privilege-item-tip">30元优惠券</div>
        </div>
        <div class="privilege-item" @click="showPopup(3)">
          <img src="../../asset/coupon.png" class="privilege-icon">
          <div class="privilege-item-name">9折券</div>
          <div class="privilege-item-tip">共发五张</div>
        </div>
      </div>
    </div>

    <div v-if="userInfo.level === 0" class="my-vip-button">
      <van-button type="primary" size="large" @click="navigateToBuy">立即开通</van-button>
    </div>
    <div v-else>
        会员截止日期：{{userInfo.vipValidEndTime}}
    </div>
    <van-popup
      :show="popShow"
      positon="center"
      closeable
      close-icon="close"
      custom-style="border-radius:10px"
      round>
      <div class="popshow-container">
        <div style="font-size: 18px; font-weight: bold">
          {{popContent.title}}
        </div>
        <div style="font-size: 14px;width: 180px">
          {{popContent.content}}
        </div>
        <div>
          <van-button type="primary"
                      custom-class="custom-button"
                      @click="popupClose"
                      size="small">确定</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import { mapGetters , mapActions} from 'vuex';
  import {MY_USER_INFO} from '@/utils/api';
  import {request} from "@/utils/request";

  const popContents = [
    {
      title:"免邮卡",
      content:"用户评价后购买的订单后，可获得5倍订单微信支付金额"
    },
    {
      title:"五倍积分",
      content:"用户评价后购买的订单后，可获得5倍订单微信支付金额"
    },
    {
      title:"生日福利",
      content:"用户评价后购买的订单后，可获得5倍订单微信支付金额"
    },
    {
      title:"优惠券",
      content:"用户评价后购买的订单后，可获得5倍订单微信支付金额"
    }
  ];


  export default {
    components: {
    },
    data() {
      return {
        balanceRecords: {
          total: 798
        },
        popShow: false,
        popContent: {

        },
        userInfo:{}

      }
    },
    methods: {
      showPopup(id) {
        console.log("id",id);
        Object.assign(this.popContent, popContents[id]);
        this.popShow = true;
      },
      popupClose() {
        console.log("popupClose")
        this.popShow = false;
      },
      navigateToBuy() {
        var url = "/pages/buyvip/main";
        console.log("url",url)
        wx.navigateTo({
          url
        });
      },
      getUserInfo() {
        let params = {};
        request(
          MY_USER_INFO,
          'GET',
          params
        ).then(
          response => {
            console.log("response",response)
            this.userInfo = response;
          }
        )
      }
    },
    computed: {
      ...mapGetters(
        [
          'isVip','isLogin'
        ]
      ),
    },
    onShow() {
      if (!this.isLogin) {
        wx.navigateTo({
          url:'/pages/login/main'
        })
      } else {
        this.getUserInfo();
      }
    },
    onUnload() {
      let pages = getCurrentPages();
      let prePage = pages[pages.length -2];
      let preUrl = prePage.route;
      if (preUrl === "pages/login/main") {
        wx.switchTab({
            url : "/pages/my/main"
          }
        )
      }
    }


  }
</script>

<style lang="scss" scoped>
@import "myvip.scss";
</style>

<style lang="wxss">
  .custom-button {
    width: 180px;
  }


</style>
