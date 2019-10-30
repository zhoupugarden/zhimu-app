<template>
  <div class="login-container">



    <div class="login-header">
      <img src="https://t12.baidu.com/it/u=541581695,4055461334&fm=76" class="circleImg">
    </div>

    <div class="login-weixin">
      <van-button type="primary" custom-class	= "login-button-custom" round @click="navigateToWxLogin">
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
      navigateToWxLogin() {

        //先获取手机号
        wx.getSetting({
          success(res) {
            if (!res.authSetting['scope.userLocation']) {
              wx.authorize({
                scope: 'scope.userLocation',
                success () {
                  console.log("用户已同意授权")
                  wx.getLocation({
                    type: 'wgs84',
                    success (res) {
                      console.log(res)
                      const latitude = res.latitude
                      const longitude = res.longitude
                      const speed = res.speed
                      const accuracy = res.accuracy
                      wx.chooseLocation({
                        success(ress) {
                          console.log(ress)
                        }
                      })
                    }
                  })
                }
              })
            }
          }
        })

      },
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
    color: #999999;
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
