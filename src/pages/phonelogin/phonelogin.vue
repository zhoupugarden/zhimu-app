<template>
  <div class="phonelogin-container">
    <div class="phonelogin-header">
      <img src="https://t12.baidu.com/it/u=541581695,4055461334&fm=76" class="circleImg">
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
      <button open-type="getUserInfo" lang="zh_CN" type="primary" @getuserinfo="verifyAndLogin">登录</button>
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
  import {toast} from '../../utils/toast';
  import {  mapActions } from 'vuex';

  const tabUrls = [
    'pages/my/main',
    'pages/cart/main',
    'pages/order/main',
    'pages/index/main'
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
          'storeToken'
        ]
      ),

      getCode(){
        console.log("this.phoneNo", this.phoneNo)
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
        if ('' !== this.errorMessage)  {
          this.errorMessage = '';
        }
      },
      inputCodeChange(event) {
        this.verifyCode = event.mp.detail;
        if ('' !== this.errorCodeMessage)  {
          this.errorCodeMessage = '';
        }
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
      // verifySmsCode(data) {
      //   request(
      //     MY_PHONE_LOGIN,
      //     'post',
      //     data
      //   ).then(
      //     response => {
      //       if (response.token) {
      //         this.storeToken(response.token);
      //         this.backToPage();
      //       }
      //     }
      //   )
      // },

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
        if (this.phoneNo === '' || this.verifyCode === '') {
          this.errorMessage = "不能为空";
        } else {
          let verifySmsCodeBo = {};
          verifySmsCodeBo.phoneNo = this.phoneNo;
          verifySmsCodeBo.code = this.verifyCode;
          this.verifyLoginCode(verifySmsCodeBo);
        }
      },

      myPhoneLogin(data) {
        let that = this;
        request(
          MY_PHONE_LOGIN,
          'post',
          data
        ).then(
          response => {
            that.storeToken(response.token);
            if (response.avatarUrl === null) {
              wx.getSetting({
                success(res) {
                  console.log("resssss==", res)
                  if (!res.authSetting['scope.userInfo']) {
                    wx.authorize({
                      scope: 'scope.userInfo',
                      success () {
                        console.log("用户已同意授权");
                        wx.getUserInfo({
                          success: res => {
                            console.log('app.js执行 getUserInfo');
                            // 可以将 res 发送给后台解码出 unionId
                            console.log(res);
                            let userUpdateWxBo = {};
                            console.log("out response", response);
                            userUpdateWxBo.userId = response.id;
                            userUpdateWxBo.avatarUrl = res.userInfo.avatarUrl;
                            userUpdateWxBo.nickName = res.userInfo.nickName;
                            userUpdateWxBo.gender = res.userInfo.gender;
                            that.updateUserWxInfo(userUpdateWxBo);
                            that.backToPage();
                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                          }
                        })
                      }
                    })
                  } else {
                    wx.getUserInfo({
                      success: res => {
                        console.log('app.js执行 getUserInfo');
                        // 可以将 res 发送给后台解码出 unionId
                        console.log(res)
                        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                        // 所以此处加入 callback 以防止这种情况
                        //如何获取openId
                        // this.verifySmsCodeBo.openId = res.userInfo;
                        // this.verifySmsCodeBo.sessionKey = res.userInfo;
                        let userUpdateWxBo = {};
                        console.log("out response", response);
                        userUpdateWxBo.userId = response.id;
                        userUpdateWxBo.avatarUrl = res.userInfo.avatarUrl;
                        userUpdateWxBo.nickName = res.userInfo.nickName;
                        userUpdateWxBo.gender = res.userInfo.gender;
                        that.updateUserWxInfo(userUpdateWxBo);
                        that.backToPage();
                      }
                    })
                  }
                },
                fail(res) {
                  console.log("fail res", res);
                }

              });

            }else {
              that.backToPage();
            }
          }
        );
      },



      backToPage() {
        let pages = getCurrentPages();
        //返回登录前的页面
        let curPage = pages[pages.length - 3];
        console.log("curPage",curPage, pages.length );

        let route = curPage.route;
        console.log("url",route);
        if (tabUrls.find(
          item => {
            return item === route;
          }
        )) {
          console.log("存在");
          wx.switchTab(
            {
              url: '/' + route
            }

          )

        }else {
          wx.navigateTo(
            {
              url: '/' + route
            }
          )
        }

      },

      updateUserWxInfo(data) {
        request(
          UPDATE_USER_WX_INFO,
          'post',
          data
        ).then(
          response => {
            console.log("update user wx info", response)
          }
        )
      },

      login() {
        let that = this;
        wx.login({
          success (resss) {
            if (resss) {
              //发起网络请求
              console.log("resss", resss);
              let userLoginBo = {};
              userLoginBo.wxCode = resss.code;
              userLoginBo.phoneNo = that.phoneNo;
              that.myPhoneLogin(userLoginBo);
            } else {
              console.log('登录失败！' + resss.errMsg)
            }
          }
        })


            //  注册， 登录，跳转
            //页面只负责处理data的业务，对code的处理在request当中
            //request.js中封装了对异常code的统一处理， 使用的是wx.showModal,后续如何进行前后台的异常统一处理和提示

      }

    },
    computed: {
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

  .phonelogin-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .circleImg {
    border-radius: 40px;
    width:80px;
    height:80px;
    margin: 20px 0px;
  }
  .phonelogin-form {
    padding: 20px 0px;
  }
  .phonelogin-tips {
    margin: 10px;
  }

  .phonelogin-footer {
    position: fixed;
    bottom: 10px;
    font-size: 12px;
    color: #999999;
    font-weight: lighter;
  }

</style>

<style lang="scss">
  .phone-login-custom {
    width: 300px;
  }


</style>

<style lang="wxss">

</style>
