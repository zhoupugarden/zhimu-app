<template>
  <div class="order-container">
    <div v-if="!isLogin" class="not-login-container">
    <div class="not-login-content">
      <div>
        <van-icon size="20px" color="#CFD4DA" name="info-o" />
        <div style="font-size: 15px; padding: 10px; color: #CFD4DA">
          您还没有登录，请登录后查看订单
        </div>
        <div>
          <van-button type="primary" @click="navigateToLogin">登录</van-button>
        </div>
      </div>
    </div>
    </div>

    <div v-else>
      <van-tabs :active="active"
                custom-class="van-tabs__custom"
                @change="onChange">
        <van-tab
          tab-class="van-tabs__custom"
          title="全部">
          <div v-for="(item, index) in orderItems" :key = "index" class="order-list">
            <order-card :orderInfo="item"
                        @payOrder="payOrder"
                        @cancelOrder="refreshItemStatus"></order-card>
          </div>
        </van-tab>
        <van-tab title="待评价">
          <div v-for="(item, index) in waitCommentItems" :key = "index" class="order-list">
            <order-card :orderInfo="item" ></order-card>
          </div>
        </van-tab>
        <van-tab title="待付款">
          <div v-for="(item, index) in waitPayItems" :key = "index" class="order-list">
            <order-card :orderInfo="item" ></order-card>
          </div>
        </van-tab>
      </van-tabs>

    </div>
    <van-dialog id="van-dialog" />


    <div v-show="hasNoOrder" style="position: absolute; top: 30%; left:40%;">
      <div >
        <img src="../../asset/order_2.png" style="width: 40px; height: 40px; padding-left: 10px; ">
      </div>
      <div style="color: #b2b2b2;">
        暂无订单
      </div>
    </div>


  </div>

</template>

<script>
  import OrderCard from '@/components/OrderCard';
  import {ADD_NEW_ADDRESS,GET_ORDER_LIST,MOCK_WX_PAY} from '@/utils/api';
  import {request} from "@/utils/request";
  import { mapGetters} from 'vuex';
  import Dialog from '../../../static/vant/dialog/dialog';

  export default {

  components: {
    OrderCard
  },

  data() {
    return {
      active:0,
      isLogin:false,
      orderItems:[],
      waitCommentItems:[],
      waitPayItems:[]
    }

  },
  methods: {
    onChange(event) {
      this.active = event.mp.detail.index;
    },

    mockWxPay(data) {
      let that = this;
      request(
        MOCK_WX_PAY,
        'POST',
        data
      ).then(
        response => {
          console.log("this response", response);
          //  微信支付成功后，跳转到myvip页面
          let params = {};
          params.orderNo = this.orderNo;
          that.orderInfo.orderStatus = 2;
          that.orderInfo.orderStatusDesc = "已支付";
        }
      )
    },

    navigateToLogin() {
      var url = "../login/main";
      console.log("url",url);
      wx.navigateTo({
        url
      });
    },
    getOrderListByUserId() {
      let params = {};
      params.userId = this.userId;
      request(
        GET_ORDER_LIST,
        'GET',
        params
      ).then(
        response => {
          console.log("orderlist", response);
          this.orderItems = response;
          this.waitCommentItems = response.filter(item => item.isComment === 0 && item.orderStatus === 4);
          this.waitPayItems = response.filter(item => item.orderStatus === 1);
        }
      )
    },

  },
    onReachBottom() {
      console.log("到达底部")
    },
    computed: {
      ...mapGetters(
        [
          'userId','token'
        ]
      ),
      hasNoOrder() {

        if (this.orderItems.length == 0) {
          return true;
        }

        if(this.waitCommentItems == 0 && this.active == 1) {
          return true;
        }
        if(this.waitPayItems == 0 && this.active == 2) {
          return true;
        }

        return false;

      }





    },
    onShow() {
    if (this.token) {
      this.isLogin = true;
      this.getOrderListByUserId();
    } else {
      console.log("this.isLogin", this.isLogin);
      this.isLogin = false;
    }

    }
}
</script>

<style scoped>
  page {
    height: 100%;
  }

  .order-container {
    position: relative;
    width: 100%;
    height:100%;
  }
  .not-login-container {
    position: absolute;
    top: 30%;
    left: 20%;
  }
  .not-login-content {
    display: flex;
    text-align: center;
  }

  .order-list {
  }
</style>
<style lang="scss">
  .van-tabs__custom {
    width: 100%;
    height: 100%;
  }
</style>

<style lang="wxss">
  page{
    height: 100%;
    background-color:#F4F4F4 !important;
  }
</style>
