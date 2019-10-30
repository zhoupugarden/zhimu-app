<template>
  <div class="address-container">
    <div class="address-info" @click="backToOrderSubmit">
      <div class="address-info_road">
        {{addressInfo.addressName}}
      </div>
      <div class="address-info_number">
        {{addressInfo.roadDetail}}
      </div>
      <div class="address-info_contact">
        {{addressInfo.receiverName}} | {{addressInfo.receiverPhone}}
      </div>
    </div>
    <div class="address-operation">
      <div class="address-operation_edit" @click="updateAddress">
        <van-icon name="edit" />
      </div>
      <div class="address-operation_remove" @click="removeAddress">
        <van-icon name="delete" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      addressInfo:Object
    },
    data () {
      return {

      }
    },
    methods: {
      backToOrderSubmit(e) {
        let pages = getCurrentPages();
        console.log("pageUrl", pages);
        let prePage = pages[1];
        if (prePage.route === 'pages/ordersubmit/main') {
          prePage.setData({addressId:e.id})
          wx.redirectTo({
            url: '/' + prePage.route + '?addressId=' + e.id
          })
        }
      },
      removeAddress() {
        this.$emit("removeAddress", this.addressInfo.id);
      },
      updateAddress() {
        let url = "../newaddress/main?addressId=" + this.addressInfo.id;
        console.log("url",url)
        wx.navigateTo({
          url
        });
      }
    },

    onShow() {
      console.log(this.addressInfo);
    }
  }
</script>

<style lang="scss" scoped>

  .address-container {
    display: flex;
    background-color: white;
    justify-content: space-between;
    margin-top: 10px;
    height: 100px;
  }
  .address-info {
    display: flex;
    font-size: 14px;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
  .address-operation {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-right: 10px;
  }

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
