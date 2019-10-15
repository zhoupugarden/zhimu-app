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
      <div class="address-operation_edit">
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
      addressInfo:Object,
      jump:Boolean
    },
    data () {
      return {

      }
    },
    methods: {
      backToOrderSubmit() {
        if (this.jump != null) {
          var url = "/pages/ordersubmit/main?addressInfo=" + "12333";
          console.log("url",url)
          wx.navigateTo({
            url
          });
        } else {
          console.log("不用跳转", this.jump)
        }

      },

      removeAddress() {
        this.$emit("removeAddress", this.addressInfo.id);
      }
    },

    mounted() {
      console.log(this.addressInfo)
      console.log("this.jump", this.jump)
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
