<template>
  <div class="myaddress-container">
    <div v-for="(item, index_) in addressArray" :key="index">
      <zhimu-address
        @removeAddress="ondelAddress"
        @updateAddress="updateAddress"
        :addressInfo="item">
      </zhimu-address>
    </div>
    <div class="address-add-button">
      <div class="address-add-button_wrap">
        <van-button round
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
  import {GET_USER_ADDRESS,DEL_USER_ADDRESS} from '@/utils/api';
  import {request} from "@/utils/request";
  import { mapGetters} from 'vuex';
  import Dialog from '../../../static/vant/dialog/dialog';
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
      console.log("del address data", data);
      let params = {};
      params.addressId = data;
      params.userId = this.userId;

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
      console.log("updateAddress:", data)
    },

    listUserAddress() {
      let params = {};
      params.userId = this.userId;
      request(
        GET_USER_ADDRESS,
        'GET',
        params
      ).then(
        response => {
          this.addressArray = response;
          console.log("this response", response);
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
          console.log("this response", response);
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
      console.log("url",url)
      wx.navigateTo({
        url
      });
    },
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
    this.listUserAddress();
    },

    onUnload() {
      let pages = getCurrentPages();
      console.log("pageUrl", pages);
      let prePage = pages[0];
      console.log("prePage:", prePage)
      
      if (prePage.route === 'pages/my/main') {
        wx.switchTab({
          url: '/' + prePage.route
        })
      } else {
        wx.redirectTo({
          url: prePage.route
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


