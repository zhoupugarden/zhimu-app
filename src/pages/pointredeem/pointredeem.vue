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

      getUserInfo(token) {
        let params = {};
        params.token = token;
        request(
          MY_USER_INFO,
          'GET',
          params
        ).then(
          response => {
            //将userID放在存储中
            console.log("response",response)
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
            //将userID放在存储中
            console.log("response",response)
            this.redeemItems = response;
          }
        )
      },

      pointRedeem(data) {
        console.log("pointRedeem", data)
        let param = {};
        param.userId = this.userId;
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
    computed: {
      ...mapGetters(
        [
          'userId', 'token'
        ]
      )
    },
    onShow() {
     this.getUserInfo(this.token);
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

  .redeem-title {
    font-size: 14px;
    font-weight:bolder;
    padding: 10px;
    color: #CDA65B;
    background-color: white;
    border-bottom: 1px solid #f2f2f2;
  }

  .redeem-header-total {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    padding: 5px 0px;
  }

  .redeem-header-operation {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: white;
    padding: 10px 0px;
  }

  .redeem-header-operation_left {
    font-size: 14px;
    font-weight: bolder;
  }
  .redeem-header-operation_right {
    font-size: 14px;
    font-weight: bolder;
  }
  .redeem-header-operation_split {
    float:left;
    width: 1px;
    height: 20px;
    background: #e6ebf3;
  }
  .redeem-detail {
    background-color: white;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding-top: 10px;
  }

  .redeem-detail-item {
    flex: 0 0 33%;
    padding: 10px 10px;
  }


</style>

<style lang="scss">

</style>

<style lang="wxss">
  page{
    height: 100%;
    background-color:#F4F4F4 !important;
  }
</style>
