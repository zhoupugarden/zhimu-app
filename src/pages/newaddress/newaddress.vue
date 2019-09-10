<template>
  <div class="newaddress-container">
    <van-cell-group>
      <van-field
        :value="contactName"
        required
        clearable
        label="联系人"
        placeholder="收货人姓名"
      />

      <van-cell title="地址" is-link :value="address.road" @click="clickChooseLocation"/>

      <van-field
        :value="number"
        required
        clearable
        label="门牌号"
        placeholder="单元楼号,门牌号"
      />

      <van-field
        :value="phoneNo"
        required
        clearable
        label="手机号"
        placeholder="手机号码"
      />

    </van-cell-group>

    <div class="address-add-button">
      <div class="address-add-button_wrap">
        <van-button round
                    custom-class="custom-button"
                    @click="navigateToNew"
                    type="primary">下一步</van-button>
      </div>
    </div>

  </div>

</template>

<script>
  export default {

  data() {
    return {
      active:0,
      address: {
        contactName:"",
        road:"请选择",
        number:"",
        phoneNo:""
      }

    }

  },
  methods: {
    onChange(event) {
      console.log(event)

    },
    clickChooseLocation() {
      let that = this;
      console.log("clickChooseLocation")
      wx.getSetting({
        success(res) {
          console.log(res)
          if (!res.authSetting['scope.userLocation']) {
            console.log(!res.authSetting['scope.userLocation'])
            wx.authorize({
              scope: 'scope.userLocation',
              success () {
                console.log("用户已同意授权")
                wx.chooseLocation({
                  success(resChoose) {
                    console.log(res)
                    that.address.road = resChoose.name

                  }
                })
              },
              fail(e) {
                console.log("为什么失败", e)
              }
            })
          }else {
            wx.chooseLocation({
              success: resChoose => {

                console.log(resChoose)
                let addressName = resChoose.name
                console.log(addressName)
                that.address.road = addressName
              }
            })
          }
        }
      })


    }
  }

}
</script>

<style lang="scss" scoped>
  .address-add-button {
    position: fixed;
    bottom: 0px;
    width: 100%;
    background-color: white;
    margin-top: 10px;
  }
  .address-add-button_wrap {
    display: flex;
    justify-content: center;
    padding: 10px 10px;
  }
</style>

<style lang="scss">
  .custom-button {
    padding:0 120px !important;
  }
</style>

<style lang="wxss">
  page{
    height: 100%;
    background-color:#F4F4F4 !important;
  }
</style>
