<template>
  <div class="my-container">

    <div class="my-profile">
      <div class="my-basic-info">
        <div class="my-basic-info__Avatar" @click="navToSetting">
          <img :src="basicInfo.avatarUrl" class="circleImg">
        </div>

        <div v-if="isLogin" class="my-basic-info__content">
          <div>{{basicInfo.nickName}}</div>
          <van-tag color="black">{{basicInfo.phoneNo}}</van-tag>
          <div @click="navigateToMission">
            <van-tag color="green">签到有奖</van-tag>
          </div>
          <div v-if="basicInfo.level === 0" @click="navigateToMyVip">
            <van-tag color="gold">加入会员享受VIP福利</van-tag>
          </div>
          <div v-else>
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
                      @click="navigateToLogin"
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
        <van-cell title="收货地址管理" icon="location-o" is-link link-type="navigateTo"
                  url="/pages/myaddress/main"/>
        <van-cell title="积分兑换" icon="location-o" is-link link-type="navigateTo"
                  url="/pages/pointredeem/main"/>
        <van-cell title="我的会员卡" icon="location-o" is-link link-type="navigateTo"
                  url="/pages/myvip/main"/>
        <van-cell title="帮助中心" icon="location-o" is-link link-type="navigateTo"
                  url="/pages/help/main"/>
      </van-cell-group>
    </div>

    <div class="my-customer-phone" @click="navigateToGetUserInfo">
      <van-cell title="客服电话 138-1740-9664" label="服务时间：9:00-21:00" icon="phone-o" />
    </div>

    <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">获取用户信息</button>
    <button open-type="getPhoneNumber" lang="zh_CN" @getphonenumber="getPhoneNumber">获取手机号</button>
  </div>

</template>

<script>


  import { mapGetters , mapActions} from 'vuex';
  import {MY_USER_INFO} from '@/utils/api';
  import {request} from "@/utils/request";

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
      isLogin:false,
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
        'storeUserId','storeIsVip'
      ]
    ),
    navigateToMyVip() {
      let url = "../myvip/main" ;
      console.log("url",url)
      wx.navigateTo({
        url
      });
    },

    navToSetting() {
      if (!this.isLogin) {
        console.log("当前用户没有登录")
      } else {
        let url = "../setting/main" ;
        console.log("url",url);
        wx.navigateTo({
          url
        });
      }
    },
    navigateToPoint() {
      let url = "../point/main" ;
      console.log("url",url)
      wx.navigateTo({
        url
      });
    },
    navigateToBalance() {
      let url = "../balance/main" ;
      console.log("url",url)
      wx.navigateTo({
        url
      });
    },
    navigateToCoupon() {
      let url = "../coupon/main?userId=" + this.userId ;
      console.log("url",url)
      wx.navigateTo({
        url
      });
    },
    navigateToMission() {
      let url = "../mission/main" ;
      console.log("url",url)
      wx.navigateTo({
        url
      });
    },
    navigateToLogin() {
      let url = "/pages/login/main" ;
      console.log("url",url)
      wx.navigateTo({
        url
      });
    },
    navigateToGetUserInfo() {
      console.log("hhhhh====")
      wx.getSetting({
        success(res) {
          console.log("resssss==", res)
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




      // wx.login({
      //   success (resss) {
      //     if (resss) {
      //       //发起网络请求
      //       console.log("resss", resss)
      //     } else {
      //       console.log('登录失败！' + res.errMsg)
      //     }
      //   }
      // })
    },
    getPhoneNumber(e) {
      console.log("获取手机号",e)
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
            this.storeUserId(response.id);
            this.storeIsVip(response.level);
            this.basicInfo = response;
          }
        )
    }

  },
  computed: {
    ...mapGetters(
      [
        'token', 'userId'
      ]
    )
  },

  onShow() {

    if (this.token) {
      this.isLogin = true;
      this.getUserInfo(this.token);
    } else {
      this.isLogin = false;
      this.basicInfo = Object.assign({}, originBasicInfo);
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
