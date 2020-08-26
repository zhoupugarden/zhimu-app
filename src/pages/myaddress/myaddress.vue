<template>
  <div class="myaddress-container">
    <div style="padding-bottom: 100px;">
      <div v-for="(item, index_) in addressArray" :key="index">
        <zhimu-address
          @removeAddress="ondelAddress"
          @updateAddress="updateAddress"
          :addressInfo="item">
        </zhimu-address>
      </div>
    </div>
    <div class="address-add-button">
      <div class="address-add-button_wrap">
        <van-button round
                    color="#000000"
                    custom-class="custom-button"
                    @click="navigateToNew"
                    type="primary">新增收货地址</van-button>
      </div>
    </div>
    <van-dialog id="van-dialog" />
  </div>
</template>
<script>
  import ZhimuAddress from '@/components/ZhimuAddress';
  import {GET_USER_ADDRESS,DEL_USER_ADDRESS, UPDATE_USER_ADDRESS} from '@/utils/api';
  import {request} from "@/utils/request";
  import { mapGetters} from 'vuex';
  import {pageUrlEnum} from "@/utils/enums";

  export default {
  components: {
    ZhimuAddress
  },
  data() {
    return {
      active:"123",
      jump:false,
      addressArray:[]
    }
  },
  methods: {
    onChange(event) {
      console.log(event)
    },
    ondelAddress(data) {
      let that = this;
      let params = {};
      params.addressId = data;

      wx.showActionSheet(
        {
          itemList:["删除"],
          success: function(res) {
            if(res.tapIndex === 0){
              that.delUserAddress(params);
            } else {

            }
          }

        }
      );
    },
    updateAddress(data) {
      console.log("updateAddress:", data);
      let params = {};
      request(
        UPDATE_USER_ADDRESS,
        'POST',
        params
      ).then(
        response => {
          this.listUserAddress();
        }
      )
    },

    listUserAddress() {
      let params = {};
      request(
        GET_USER_ADDRESS,
        'GET',
        params
      ).then(
        response => {
          this.addressArray = response;
        }
      )
    },

    delUserAddress(data) {
      let params = data;
      request(
        DEL_USER_ADDRESS,
        'POST',
        params
      ).then(
        response => {
          this.listUserAddress();
        }
      )
    },

    navigateToNew() {
      let length = this.addressArray.length;
      let url = "";
      if (length === 0) {
        url = "/pages/newaddress/main?isNew=true";
      } else {
        url = "/pages/newaddress/main?isNew=false";
      }
      wx.navigateTo({
        url
      });
    },
  },
    computed: {
      ...mapGetters(
        [
          'isLogin'
        ]
      )
    },
    onShow() {
      this.listUserAddress();
    },

    onUnload() {
      let pages = getCurrentPages();
      let prePage = pages[pages.length -2];
      let preUrl = prePage.route;
      console.log("preUrl", preUrl);
      if ('/' + preUrl === pageUrlEnum.login_url) {
        wx.switchTab({
            url : pageUrlEnum.my_url
          }
        )
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "myaddress.scss";
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


