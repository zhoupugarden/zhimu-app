<template>
  <div class="address-container" @click="backToOrderSubmit">
    <div class="address-info">
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
        <van-icon color="#b2b2b2" size="20px" name="edit" />
      </div>
      <div class="address-operation_remove" @click="removeAddress">
        <van-icon color="#b2b2b2" size="20px" name="delete" />
      </div>
    </div>
  </div>
</template>

<script>

  import {pageUrlEnum} from "@/utils/enums";

  export default {
    props: {
      addressInfo:Object
    },
    data () {
      return {

      }
    },
    methods: {
      backToOrderSubmit() {
        let pages = getCurrentPages();
        console.log("pageUrl", pages);
        let prePage = pages[1];
        if ('/' + prePage.route === pageUrlEnum.order_submit_url) {
          prePage.setData({addressId:this.addressInfo.id})
          wx.redirectTo({
            url: pageUrlEnum.order_submit_url + '?addressId=' + this.addressInfo.id
          })
        }
      },
      removeAddress() {
        this.$emit("removeAddress", this.addressInfo.id);
      },
      updateAddress() {
        let url = pageUrlEnum.new_address_url + "?addressId=" + this.addressInfo.id;
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
    justify-content: space-around;
    padding: 0px 15px;
    width: 70%;
  }

  .address-info_number {
    width: 70%;
    word-wrap: break-word;
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
