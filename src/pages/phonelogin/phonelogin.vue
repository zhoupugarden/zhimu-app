<template>
  <div class="phonelogin-container">



    <div class="phonelogin-header">
      <img src="https://t12.baidu.com/it/u=541581695,4055461334&fm=76" class="circleImg">
    </div>

    <div class="phonelogin-form">

      <van-cell-group>
        <van-field
          center
          clearable
          placeholder="手机号"
          border="false"
        >
        </van-field>

        <van-field
          :value="sms"
          center
          clearable
          placeholder="请输入短信验证码"
          border="false"
          use-button-slot
        >
          <van-button slot="button" size="small" plain>发送验证码</van-button>
        </van-field>
      </van-cell-group>
    </div>
    <div class="phonelogin-tips">
      <div style=" font-size: 10px; font-family: 'Microsoft YaHei'">
        温馨提示：未注册zhimu蛋糕的手机号，登录时将自动注册
      </div>
    </div>
    <div>
      <van-button custom-class="phone-login-custom" type="primary">登录</van-button>

    </div>


    <div class="phonelogin-footer">
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
