<template>
  <div class="phonelogin-container">
    <div class="phonelogin-header">
      <img :src="merchantInfo.logoUrl" class="circleImg">
    </div>

    <div class="phonelogin-form">

      <van-cell-group>
        <van-field
          :value="phoneNo"
          center
          clearable
          placeholder="手机号"
          maxlength="11"
          :error-message="errorMessage"
          @change="inputChange"
          type="number"
          border="false"
        >
        </van-field>

        <van-field
          :value="verifyCode"
          center
          maxlength="6"
          placeholder="请输入短信验证码"
          type="number"
          @input="inputCodeChange"
          border="false"
          :error-message="errorCodeMessage"
          use-button-slot
        >
          <van-button slot="button" size="small" @click="getCode" plain>{{codeText}}</van-button>
        </van-field>
      </van-cell-group>
    </div>
    <div class="phonelogin-tips">
      <div style=" font-size: 10px; font-family: 'Microsoft YaHei'">
        温馨提示：未注册zhimu蛋糕的手机号，登录时将自动注册
      </div>
    </div>
    <div>
      <button class="btn1" open-type="getUserInfo" lang="zh_CN" type="primary" @getuserinfo="verifyAndLogin">登录</button>
    </div>

    <div class="phonelogin-footer">
      zhimu蛋糕|每一口都是快乐
    </div>

    <van-toast  id="van-toast"/>
  </div>
</template>

<script>

  import {SMS_VERIFY_CODE_SEND, SMS_VERIFY_CODE_VERIFY, MY_PHONE_LOGIN, UPDATE_USER_WX_INFO} from '@/utils/api';
  import {request} from "@/utils/request";
  import {getLocation, getAuth, getUserWxInfo, wxLogin} from '@/utils/wxApi';
  import { mapActions, mapState } from 'vuex';

  const tabUrls = [
    'pages/my/main',
    'pages/cart/main',
    'pages/order/main',
    'pages/home/main'
  ];


  export default {

    data() {
      return {
        show:true,
        phoneNo:'',
        verifyCode:'',
        count: '',
        timer: null,
        errorMessage:'',
        errorCodeMessage:''
      }
    },
    methods: {
      ...mapActions(
        [
          'storeToken',
          'storeIsLogin',
          'addCurrentLocation'
        ]
      ),

      getCode(){
        if (this.validPhoneNo(this.phoneNo)) {
          const TIME_COUNT = 60;
          if (!this.timer) {
            this.sendVerifyCode(this.phoneNo);
            this.count = TIME_COUNT;
            this.show = false;
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--;
              } else {
                this.show = true;
                clearInterval(this.timer);
                this.timer = null;
              }
            }, 1000)
          }
        }
      },

      validPhoneNo(num) {
        let valid = true;
        if (null === num || '' === num) {
          this.errorMessage = '手机号码不能为空';
          valid = false;
        }
        if(!(/^1[3456789]\d{9}$/.test(num))){
          this.errorMessage = '手机号码格式错误';
          valid = false;
        }
        return valid;
      },
      //mpvue不支持小程序原生组件的双向绑定。
      inputChange(event) {
        this.phoneNo = event.mp.detail;

      },
      inputCodeChange(event) {
        this.verifyCode = event.mp.detail;

      },

      sendVerifyCode(phoneNo) {
        let param = {};
        param.phoneNo = phoneNo;
        request(
          SMS_VERIFY_CODE_SEND,
          'post',
          param
        ).then(
          (response) => {
            console.log("this response", response);
          }
        )
      },

      verifyLoginCode(data) {
        let that = this;
        request(
          SMS_VERIFY_CODE_VERIFY,
          'post',
          data
        ).then(
          response => {
            if (response === "成功") {
              that.login();
            }
          }
        )
      },

      verifyAndLogin() {
          let verifySmsCodeBo = {};
          verifySmsCodeBo.phoneNo = this.phoneNo;
          verifySmsCodeBo.code = this.verifyCode;
          this.verifyLoginCode(verifySmsCodeBo);
      },

      myPhoneLogin(data) {
        let that = this;
        request(
          MY_PHONE_LOGIN,
          'post',
          data
        ).then(
          response => {
            let token = response;
            that.storeToken(token);
            that.storeIsLogin(true);
            getAuth('scope.userLocation', async () => {
              let location = await getLocation();
              this.addCurrentLocation(location);
            });
            getAuth('scope.userInfo', async () => {
              let wxInfo = await getUserWxInfo();
              let userUpdateWxBo = {};
              userUpdateWxBo.avatarUrl = wxInfo.userInfo.avatarUrl;
              userUpdateWxBo.nickName = wxInfo.userInfo.nickName;
              userUpdateWxBo.gender = wxInfo.userInfo.gender;
              that.updateUserWxInfo(userUpdateWxBo);
              //这里back可能更新动作还未结束，返回上一页面获取不到最新信息
              // that.backToPage();
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
            })


          }
        );
      },

      backToPage() {
        console.log("backToPage");
        let pages = getCurrentPages();
          let curPage = pages[pages.length - 2];
          let route = curPage.route;
        if (tabUrls.find(
          item => {
            return item === route;
          }
        )) {
          wx.switchTab(
            {
              url: '/' + route
            }
          )

        }else {
          wx.navigateBack(
            {
              delta:1
            }
          )
        }
      },

      updateUserWxInfo(data) {
        let that = this;
        request(
          UPDATE_USER_WX_INFO,
          'post',
          data
        ).then(
          response => {
            that.backToPage();
          }
        )
      },

      login() {
        let that = this;
        wxLogin(async (res) => {
          //发起网络请求
          let userLoginBo = {};
          userLoginBo.phoneNo = this.phoneNo;
          userLoginBo.code = res.code;
          that.myPhoneLogin(userLoginBo);
        });
            //  注册， 登录，跳转
            //页面只负责处理data的业务，对code的处理在request当中
            //request.js中封装了对异常code的统一处理， 使用的是wx.showModal,后续如何进行前后台的异常统一处理和提示
      }

    },
    computed: {
      ...mapState({
        isLogin: state=>state.isLogin,
        merchantInfo:state => state.merchant.merchantInfo
      }),

      codeText() {
        if (this.show) {
          return '获取验证码';
        } else {
          return this.count + 's重新获取';
        }
      }
    }

  }
</script>

<style lang="scss" scoped>
@import "phonelogin.scss";


.btn1 {
  width: 200px;
  margin-top: 10px;
  background-color: #000000;
  font-size: 14px;
  color: white;
  border-radius: 49px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}



.btn1::after {
  border-radius: 49px;
  border: 0;
}


</style>

<style lang="scss">
  .phone-login-custom {
    width: 300px;
  }


</style>

<style lang="wxss">

</style>
