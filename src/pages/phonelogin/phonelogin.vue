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
      <van-button custom-class="phone-login-custom" type="primary" @click="login">登录</van-button>
    </div>

    <div class="phonelogin-footer">
      zhimu蛋糕|每一口都是快乐
    </div>

    <van-toast  id="van-toast"/>
  </div>
</template>

<script>

  import {SMS_VERIFY_CODE_SEND, SMS_VERIFY_CODE_VERIFY, MY_PHONE_LOGIN} from '@/utils/api';
  import {request} from "@/utils/request";
  import {toast} from '../../utils/toast';
  import {  mapActions } from 'vuex';


  export default {

    data() {
      return {
        show:true,
        phoneNo:'',
        verifyCode:'',
        count: '',
        timer: null,
        errorMessage:'',
        errorCodeMessage:'',
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
      verifySmsCode(data) {
        request(
          MY_PHONE_LOGIN,
          'post',
          data
        ).then(
          response => {
            console.log("response",response)
            if (response.token) {
              this.storeToken(response.token);
              toast("验证码正确");
            }
          }
        )
      },

      login() {

        console.log("redirect:", getCurrentPages())
        let pages = getCurrentPages();
        //返回登录前的页面
        let curPage = pages[pages.length - 3];
        console.log("curPage",curPage, pages.length );

        let route = curPage.route;
        console.log("url",route)

        wx.switchTab({
          url: '/' + route
          }
        );
        console.log("url",route);

        // curPage.onShow();

        console.log("login", this.verifyCode);
        if (this.verifyCode === null || this.verifyCode === '') {
          this.errorCodeMessage = '验证码不能为空';
        } else {
          let verifyParam = {};
          verifyParam.phoneNo = this.phoneNo;
          verifyParam.code = this.verifyCode;

          this.verifySmsCode(verifyParam);
            //  注册， 登录，跳转
            //页面只负责处理data的业务，对code的处理在request当中
            //request.js中封装了对异常code的统一处理， 使用的是wx.showModal,后续如何进行前后台的异常统一处理和提示
        }
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
