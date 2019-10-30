<template>
  <div class="newaddress-container">
    <van-cell-group>
      <van-field
        :value="address.receiverName"
        @change="receiverNameChange"
        required
        clearable
        label="联系人"
        placeholder="收货人姓名"
      />

      <van-cell title="地址" is-link :value="address.addressName" @click="clickChooseLocation"/>

      <van-field
        :value="address.roadDetail"
        required
        @change="roadDetailChange"
        clearable
        label="门牌号"
        placeholder="单元楼号,门牌号"
      />

      <van-field
        :value="address.receiverPhone"
        required
        @change="receiverPhoneChange"
        clearable
        label="手机号"
        placeholder="手机号码"
      />

    </van-cell-group>

    <div class="address-add-button">
      <div class="address-add-button_wrap">
        <van-button round
                    custom-class="custom-button"
                    @click="addOrUpdateAddress"
                    type="primary">下一步</van-button>
      </div>
    </div>

  </div>

</template>

<script>

  const defaultAdress = {
    receiverName:"",
    addressName:"请选择",
    roadName:"请选择",
    roadDetail:"",
    receiverPhone:"",
    latitude:null,
    longitude:null
  }

  import {ADD_NEW_ADDRESS, GET_ADDRESS_BY_ID, UPDATE_USER_ADDRESS} from '@/utils/api';
  import {request} from "@/utils/request";
  import { mapGetters} from 'vuex';
  export default {

  data() {
    return {
      active:0,
      address: {},
      isNew:false,
      addressId:""

    }

  },
  methods: {

    addOrUpdateAddress() {
      if (this.addressId) {
        this.updateAddress();
      }else {
        this.addNewAddress();
      }
    },

    addNewAddress() {
      let params = this.address;
      params.userId = this.userId;
      request(
        ADD_NEW_ADDRESS,
        'POST',
        params
      ).then(
        response => {
          this.items = response;
          console.log("this response", response);
          let url = "/pages/myaddress/main" ;
          console.log("url",url);
          let pages = getCurrentPages();
          console.log("pageUrl", pages);
          let prePage = pages[pages.length - 3];
          console.log("this.isNew === 'true'", this.isNew === 'true');
          console.log("prePage === 'pages/ordersubmit/main'", prePage.route === 'pages/ordersubmit/main')
          if (this.isNew === 'true' && prePage.route === 'pages/ordersubmit/main') {
            wx.navigateBack(
              {
                url:"/pages/ordersubmit/main"
              }
            )
          } else {
            wx.navigateTo({
              url
            });
          }
          // 操作后清空原有数据
          this.address = Object.assign({}, defaultAdress);
        }
      )
    },

    updateAddress() {
      let params = this.address;
      params.addressId = this.addressId;
      params.userId = this.userId;
      request(
        UPDATE_USER_ADDRESS,
        'POST',
        params
      ).then(
        response => {
          console.log("update response", response);
          // 操作后清空原有数据
          this.address = Object.assign({}, defaultAdress);
          this.addressId = "";
          let url = "../myaddress/main";
          console.log("url",url)
          wx.navigateTo({
            url
          });

        }
      )
    },
    getAddressById(addressId) {
      let params = {};
      params.addressId = addressId;
      request(
        GET_ADDRESS_BY_ID,
        'GET',
        params
      ).then(
        response => {
          this.address = response;
          console.log("this response", response);
        }
      )
    },


    receiverNameChange(event) {
      this.address.receiverName = event.mp.detail;
    },

    receiverPhoneChange(event) {
      this.address.receiverPhone = event.mp.detail;
    },

    roadDetailChange(event) {
      this.address.roadDetail = event.mp.detail;
    },


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
                    that.address.roadName = resChoose.address
                    that.address.latitude = resChoose.latitude
                    that.address.longitude = resChoose.longitude
                    that.address.name = resChoose.name
                  }
                })
              },
              fail(e) {
                console.log("为什么失败", e);


                wx.showModal({
                  title: '提示',
                  content: '请开启定位功能以便确定是否可以免费配送',
                  success (res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                      wx.openSetting(
                        {
                          success(res) {
                            console.log(res)
                          }
                        }
                      )
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
                })

              }
            })
          }else {
            wx.chooseLocation({
              success: resChoose => {

                console.log(resChoose)
                let addressName = resChoose.name
                console.log(addressName)

                that.address.roadName = resChoose.address
                that.address.addressName = resChoose.name
                that.address.latitude = resChoose.latitude
                that.address.longitude = resChoose.longitude
              }
            })
          }
        }
      })


    }
  },
    computed: {
      ...mapGetters(
        [
          'userId'
        ]
      )
    },
    onShow() {
      let params = this.$root.$mp.query;
      console.log("this.$root.$mp.query", params);
      if (params.isNew) {
        this.isNew = params.isNew;
      }
      if (params.addressId) {
        this.addressId = params.addressId;
        this.getAddressById(params.addressId);
        this.$root.$mp.query = "";
      }

    },
    onUnload() {
      this.address = Object.assign({}, defaultAdress);
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
