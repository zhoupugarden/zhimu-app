<template>
  <div class="login-container">



    <div class="login-header">
      <img src="https://t12.baidu.com/it/u=541581695,4055461334&fm=76" class="circleImg">
    </div>

    <div class="login-weixin">
      <van-button type="primary" custom-class	= "login-button-custom" round >
        <van-icon name="chat-o"/>
        按钮微信授权登录
      </van-button>
      <div>
      </div>
    </div>
    <div class="login-other" @click="navigateToUserLogin">
      <div style="color: blue; font-size: 14px; font-family: 'Microsoft YaHei'">
        其他方式登录
      </div>
    </div>
    <div class="login-footer">
      zhimu蛋糕|每一口都是快乐
    </div>


  </div>
</template>

<script>

  export default {

    data() {
      return {

      }
    },
    methods: {
      navigateToUserLogin() {
        let url = "/pages/phonelogin/main" ;
        console.log("url",url)
        wx.navigateTo({
          url
        });
      }

    }

  }
</script>

<style lang="scss" scoped>

  .login-container {
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
  .login-other {
    padding: 20px 0px;
  }
  .login-weixin {
    padding: 10px 0px;

  }
  .login-footer {
    position: fixed;
    bottom: 10px;
    font-size: 12px;
    color: #CFD4DA;
    font-weight: lighter;
  }

</style>

<style lang="scss">
  .login-button-custom {
    width: 300px;
    height: 80px;
  }


</style>

<style lang="wxss">
  page{
    height: 100%;
    background-color:#F4F4F4 !important;
  }
</style>
