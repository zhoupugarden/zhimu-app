<template>
  <div class="my-container">

    <div class="my-profile">
      <div class="my-basic-info">
        <div class="my-basic-info__Avatar" @click="navToSetting">
          <img :src="basicInfo.avatarUrl" class="circleImg">
        </div>

        <div v-if="isLogin" class="my-basic-info__content">
          <div style="display: flex;">
            <div style="padding-right: 10px;">{{basicInfo.nickName}}</div>
            <div @click="navigateToMission">
              <van-button plain type="info" color="black" size="mini">每日签到</van-button>
            </div>
          </div>
          <div style="font-size: 12px;">{{basicInfo.phoneNo}}</div>
          <div v-if="!isVip" @click="navigateToMyVip">
            <span class="vip_tip_2">VIP</span>
            <span class="vip_tip">加入会员享受VIP福利</span>
          </div>
          <div v-else @click="navigateToVip">
            <van-tag color="gold">VIP用户</van-tag>
          </div>
        </div>
        <div v-else @click="navigateToLogin" class="my-basic-info__content">
          <div>
            未登录
          </div>
          <div style="font-size: 10px; color: #F39B00">
            点击登录账号
          </div>
        </div>

        <div class="my-basic-info__go">
          <van-button round color="grey"
                      custom-class="mini-button"
                      @click="navigateToStarVip"
                      size="mini">开通星球会员></van-button>
        </div>

      </div>
      <div class="my-wallet-info">

        <div class="my-wallet-info__style" @click="navigateToBalance">
          <div style="font-weight: 600;font-size: 15px;"> {{basicInfo.balanceAmount}} 元</div>
          <div style="font-weight: lighter;font-size: 10px;padding: 5px;">余额</div>
        </div>

        <div class="my-wallet-info__style" @click="navigateToCoupon">
          <div style="font-weight: 600;font-size: 15px;"> {{basicInfo.couponCount}} 个</div>
          <div style="font-weight: lighter;font-size: 10px;padding: 5px;">优惠券</div>

        </div>

        <div class="my-wallet-info__style" @click="navigateToPoint">
          <div style="font-weight: 600;font-size: 15px;"> {{basicInfo.pointAmount}} 分</div>
          <div style="font-weight: lighter;font-size: 10px;padding: 5px;">积分</div>
        </div>
      </div>
    </div>

    <div class="my-operation">
      <van-cell-group>
        <van-cell title="收货地址管理" icon="location-o" is-link @click="navigateMyAddress"/>
        <van-cell title="积分兑换" icon="points" is-link  @click="navigatePointRedeem"/>
        <van-cell title="我的会员卡" icon="idcard" is-link @click="navigateToMyVip"/>
        <van-cell title="帮助中心" icon="question-o" is-link link-type="navigateTo"
                  url="/pages/help/main"/>
      </van-cell-group>
    </div>

    <div class="my-customer-phone" @click="callCustomerPhone">
        <van-cell title="客服电话 138-1740-9664" label="服务时间：9:00-21:00" icon="phone-o"/>
    </div>
  </div>
</template>

<script>


  import { mapState , mapActions} from 'vuex';
  import {MY_USER_INFO} from '@/utils/api';
  import {request} from "@/utils/request";
  import {pageUrlEnum} from "@/utils/enums";

  const originBasicInfo = {
    avatarUrl:"/static/images/avatar.png",
    balanceAmount:0,
    pointAmount:0,
    couponCount:0
  };

  export default {

  components: {
  },
  data() {
    return {
      basicInfo: {},

      walletInfo : {
        balance: 100,
        coupon:2,
        point : 100
      },
      userInfo: {}

    }

  },
  methods: {
    ...mapActions(
      [
        'storeIsVip'
      ]
    ),

    navigateToVip() {
      wx.navigateTo({
        url:pageUrlEnum.vip_url
      });
    },

    callCustomerPhone() {
      wx.makePhoneCall({
        phoneNumber: '13817409664'
      })
    },

    navToSetting() {
      if (!this.isLogin) {
      } else {
        wx.navigateTo({
          url:pageUrlEnum.setting_url
        });
      }
    },

    navigateToLogin() {
      wx.navigateTo({
        url:pageUrlEnum.login_url
      });
    },

    navigateToPoint() {
      if (!this.isLogin) {
        let pages = getCurrentPages(); 				//前两句不要忘记写
        let currentPage = pages[pages.length - 1]; 	//前两句不要忘记写
        currentPage.route = "pages/point/main";
        console.log(pages);
        wx.navigateTo({
          url:pageUrlEnum.login_url
        });
      } else {
        wx.navigateTo({
          url:pageUrlEnum.point_url
        });
      }
    },


    navigateMyAddress() {
      if (!this.isLogin) {
        let pages = getCurrentPages(); 				//前两句不要忘记写
        let currentPage = pages[pages.length - 1]; 	//前两句不要忘记写
        currentPage.route = "pages/myaddress/main";
        wx.navigateTo({
          url:pageUrlEnum.login_url
        });
      } else {
        wx.navigateTo({
          url:pageUrlEnum.my_address_url
        });
      }
    },

    navigatePointRedeem() {
    if (!this.isLogin) {
      let pages = getCurrentPages(); 				//前两句不要忘记写
      let currentPage = pages[pages.length - 1]; 	//前两句不要忘记写
      currentPage.route = "pages/pointredeem/main";
      console.log(pages);
      wx.navigateTo({
        url:pageUrlEnum.login_url
      });
    } else {
      wx.navigateTo({
        url:pageUrlEnum.point_redeem_url
      });
    }
  },
    navigateToMyVip() {
    if (!this.isLogin) {
      let pages = getCurrentPages(); 				//前两句不要忘记写
      let currentPage = pages[pages.length - 1]; 	//前两句不要忘记写

      if (this.basicInfo.vip) {
        currentPage.route = "pages/vip/main";
      } else {
        currentPage.route = "pages/starvip/main";
      }
      console.log(pages);
      wx.navigateTo({
        url:pageUrlEnum.login_url
      })
    } else if (!this.basicInfo.vip) {
      wx.navigateTo({
        url:pageUrlEnum.star_vip_url
      });
    }
    else {
      wx.navigateTo({
        url:pageUrlEnum.vip_url
      });
    }
  },

    navigateToBalance() {
      if (!this.isLogin) {
        let pages = getCurrentPages(); 				//前两句不要忘记写
        let currentPage = pages[pages.length - 1]; 	//前两句不要忘记写
        currentPage.route = "pages/balance/main";
        console.log(pages);
        wx.navigateTo({
          url:pageUrlEnum.login_url
        });
      } else {
        wx.navigateTo({
          url:pageUrlEnum.balance_url
        });
      }

    },
    navigateToCoupon() {
      if (!this.isLogin) {
        let pages = getCurrentPages(); 				//前两句不要忘记写
        let currentPage = pages[pages.length - 1]; 	//前两句不要忘记写
        currentPage.route = "pages/coupon/main";
        console.log(pages);
        wx.navigateTo({
          url:pageUrlEnum.login_url
        });
      } else {
        wx.navigateTo({
          url:pageUrlEnum.coupon_url
        });
      }
    },
    navigateToMission() {
      wx.navigateTo({
        url:pageUrlEnum.mission_url
      });
    },
    navigateToStarVip() {
      let url = "/pages/demo/main" ;
      wx.navigateTo({
        url
      });
    },
    navigateToGetUserInfo() {
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userInfo']) {
            wx.authorize({
              scope: 'scope.userInfo',
              success () {
                console.log("用户已同意授权")
              }
            })
          }
        }
      })

    },
    onGotUserInfo(res) {
      console.log(res);
      wx.login({
        success (resss) {
          if (resss) {
            //发起网络请求
            console.log("resss", resss)
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })

      wx.getUserInfo({
        success: res => {
          console.log('app.js执行 getUserInfo');
          // 可以将 res 发送给后台解码出 unionId
          console.log(res)

          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
        }
      })

    },
    getPhoneNumber(e) {
      console.log("获取手机号",e)
    },
    getUserInfo() {
      let params = {};
        request(
          MY_USER_INFO,
          'GET',
          params
        ).then(
          response => {
            this.basicInfo = response;
            this.storeIsVip(response.vip);

          }
        )
    }
  },
    computed: {
      ...mapState({
        isLogin: state => state.isLogin,
        isVip: state => state.isVip
      }),
    },


    onShow() {
    if (this.isLogin) {
      this.getUserInfo();
    } else {
      this.basicInfo = Object.assign({}, originBasicInfo);
    }
  }

}
</script>

<style lang="scss" scoped>
  @import "./my.scss";
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
