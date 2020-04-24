<template>
  <div class="redeem-container">

    <div class="redeem-header">
      <div class="redeem-header-total">
        <div style="color: #CDA65B">
          {{userInfo.pointAmount}}
        </div>
        <div style="color: #ACC0D8; font-size: 14px">
          可用积分
        </div>
      </div>
      <div class="redeem-header-operation">
        <div class="redeem-header-operation_left" @click="navigateToPoint">积分明细</div>
        <div class="redeem-header-operation_split"></div>
        <div class="redeem-header-operation_right" @click="navigateToCoupon">兑换记录</div>
      </div>

    </div>
    <div class="redeem-title">
      优惠券专区
    </div>
    <div class="redeem-detail">
      <div class="redeem-detail-item" v-for="(item, index) in redeemItems" :key="index">
        <redeem-item
          @pointRedeem="pointRedeem"
          :redeemItem="item"></redeem-item>
      </div>
    </div>

  </div>
</template>

<script>
  import RedeemItem from '@/components/RedeemItem';
  import {POINT_REDEEM, MY_USER_INFO, GET_POINT_MALL } from '@/utils/api';
  import { mapGetters} from 'vuex';
  import {request} from "@/utils/request";

  export default {
    components: {
      RedeemItem
    },
    data() {
      return {
        balanceRecords: {
          total: 798
        },
        pointTotal:0,
        userInfo: {},

        redeemItems:[]

      }
    },
    methods: {
      navigateToPoint() {
        var url = "/pages/point/main";
        wx.navigateTo({
          url
        });
      },
      navigateToCoupon() {
        var url = "/pages/coupon/main";
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
            this.userInfo = response;
          }
        )
      },

      getPointmallList() {
        request(
          GET_POINT_MALL,
          'GET',
        ).then(
          response => {
            console.log("response",response)
            this.redeemItems = response;
          }
        )
      },

      pointRedeem(data) {
        console.log("pointRedeem", data)
        let param = {};
        param.pointMallId = data.id;
        request(
          POINT_REDEEM,
          'post',
          param
        ).then(
          (response) => {
            this.pointTotal = response.point;
            wx.showModal({
              title: "兑换成功",
              content: '点击下方【查看】可以看到已兑换优惠券',
              confirmText: '去看看',
              showCancel: true,
              success(res) {
                if(res.confirm) {
                  wx.navigateTo(
                    {
                      url:'/pages/coupon/main'
                    }
                  )
                }
              }
            });
          }
        )
      }

    },

    onShow() {
     this.getUserInfo();
     this.getPointmallList();
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
@import "pointredeem.scss";
</style>

<style lang="scss">

</style>

<style lang="wxss">
  page{
    height: 100%;
    background-color:#F4F4F4 !important;
  }
</style>
