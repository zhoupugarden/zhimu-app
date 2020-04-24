<template>
  <div class="login-container">
    <div class="login-header">
      <img :src="merchantInfo.logoUrl" class="circleImg">
    </div>

    <div class="login-weixin">
      <button class="btn1" open-type="getUserInfo" lang="zh_CN" type="primary" @getuserinfo="navigateToWxLogin">
        <image class='btnImg' src='/static/images/wechat.png'></image>
        微信授权登录
      </button>
    </div>
    <div class="login-other" @click="navigateToUserLogin">
      <div style="color: blue; font-size: 14px; font-family: 'Microsoft YaHei'">
        其他方式登录
      </div>
    </div>
    <div class="login-footer">
      {{merchantInfo.slogan}}
    </div>


  </div>
</template>

<script>

  import {  mapState,  mapActions} from 'vuex';
  import {getLocation, getAuth, getUserWxInfo} from '@/utils/wxApi';
  export default {

    data() {
      return {
      }
    },
    methods: {
      ...mapActions(
        [
          'addCurrentLocation'
        ]
      ),
       navigateToWxLogin() {
         getAuth('scope.userLocation', async () => {
           let location = await getLocation();
           console.log("=====", location);
           this.addCurrentLocation(location);
         });
         getAuth('scope.userInfo', async () => {
           let wxInfo = await getUserWxInfo();
           console.log("==wxInfo===", wxInfo);
         })

      },

      navigateToUserLogin() {
        let url = "/pages/phonelogin/main" ;
        console.log("url",url);
        wx.navigateTo({
          url
        });
      }
    },
    computed: {
      ...mapState({
        merchantInfo: state=>state.merchant.merchantInfo,
      }),
    },

  }
</script>

<style lang="scss" scoped>
  @import "login.scss";
  .btn1 {
    width: 300px;
    margin-top: 10px;
    background-color: #09BB07;
    font-size: 14px;
    color: white;
    border-radius: 49px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }

  .btnImg {
    margin-right: 4px;
    width: 23px;
    height: 23px;
  }

  .btn1::after {
    border-radius: 49px;
    border: 0;
  }

</style>

<style lang="wxss">
  page{
    height: 100%;
    background-color:#F4F4F4 !important;
  }
</style>
