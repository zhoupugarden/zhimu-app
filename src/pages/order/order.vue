<template>
  <div class="order-container">
    <div v-if="!isLogin" class="not-login-container">
    <div class="not-login-content">
      <div>
        <div style="font-size: 14px; padding: 10px; color: #B2B2B2">
          您还没有登录，请登录后查看订单
        </div>
        <div>
          <van-button color="#000000" type="primary"
                      custom-style="width:100px; height:30px;"
                      round @click="navigateToLogin">登录</van-button>
        </div>
      </div>
    </div>
    </div>

    <div v-else>
      <van-tabs :active="active"
                animated
                color="#000000"
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
          <div v-for="(item, index) in orderItems" :key = "index" class="order-list">
            <order-card :orderInfo="item"></order-card>
          </div>
        </van-tab>
        <van-tab title="待付款">
          <div v-for="(item, index) in orderItems" :key = "index" class="order-list">
            <order-card :orderInfo="item"></order-card>
          </div>
        </van-tab>
      </van-tabs>

    </div>
    <van-dialog id="van-dialog" />


    <div v-show="hasNoOrder && isLogin" style="position: absolute; top: 30%; left:40%;">
      <div >
        <img src="../../asset/order_2.png" style="width: 40px; height: 40px; padding-left: 10px; ">
      </div>
      <div style="color: #b2b2b2;">
        暂无订单
      </div>
    </div>

    <van-toast  id="van-toast"/>
  </div>

</template>

<script>
  import OrderCard from '@/components/OrderCard';
  import {ADD_NEW_ADDRESS,GET_ORDER_LIST,MOCK_WX_PAY} from '@/utils/api';
  import {request} from "@/utils/request";
  import { mapGetters} from 'vuex';
  import {toast} from '../../utils/toast';

  import {pageUrlEnum} from "@/utils/enums";

  export default {

  components: {
    OrderCard
  },

  data() {
    return {
      active:0,
      orderItems:[],
      waitCommentItems:[],
      waitPayItems:[],
      pageSize:10,
      pageNum:1,
      totalPage:1,
      orderStatus:"",
    }

  },
  methods: {
    onChange(event) {
      this.pageNum = 1;
      this.active = event.mp.detail.index;
      let params = {};
      params.pageNum = this.pageNum;
      params.pageSize = this.pageSize;
      if (this.active === 0) {
        this.orderStatus = "";
        params.orderStatus = this.orderStatus;
      }
      if (this.active === 1) {
        this.orderStatus = 7;
        params.orderStatus = this.orderStatus;
      }
      if (this.active === 2) {
        this.orderStatus = 1;
        params.orderStatus = this.orderStatus;
      }

      this.getOrderListByUserId(params);

    },
    mockWxPay(data) {
      let that = this;
      request(
        MOCK_WX_PAY,
        'POST',
        data
      ).then(
        response => {
          //  微信支付成功后，跳转到myvip页面
          let params = {};
          params.orderNo = this.orderNo;
          that.orderInfo.orderStatus = 2;
          that.orderInfo.orderStatusDesc = "已支付";
        }
      )
    },

    navigateToLogin() {
      wx.navigateTo({
        url:pageUrlEnum.login_url
      });
    },
    getOrderListByUserId(params) {
      request(
        GET_ORDER_LIST,
        'GET',
        params
      ).then(
        response => {
          if (params.pageNum > 1) {
            this.orderItems = this.orderItems.concat(response.list);
          } else {
            this.orderItems = response.list;
            this.totalPage = response.totalPage;
          }
        }
      )
    },

  },
    computed: {
      ...mapGetters(
        [
          'isLogin'
        ]
      ),
      hasNoOrder() {
        if (this.orderItems.length == 0) {
          return true;
        }
        return false;
      }

    },
    onShow() {
    if (this.isLogin) {
      let params = {};
      this.getOrderListByUserId(params);
      this.active = 0;
    }
    },
    onReachBottom() {
      //要做个判断， 如果size已经小于10， 则不再分页查询
      console.log("到达底部");
      if (this.pageNum === this.totalPage && this.pageNum !== 1) {
        toast("没有更多订单");
        return;
      }
      if (this.pageNum === this.totalPage && this.pageNum === 1) {
        return;
      }

      let params = {};
      params.pageSize = this.pageSize;
      params.pageNum = this.pageNum + 1;
      this.pageNum = this.pageNum + 1;
      if (null !== this.orderStatus) {
        params.orderStatus = this.orderStatus;
      }

      this.getOrderListByUserId(params);
    },




}
</script>

<style lang="scss" scoped>
  @import "order.scss";

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
