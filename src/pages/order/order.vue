<template>
  <div class="order-container">
    <div v-if="!isLogin" class="not-login-container">

    <div class="not-login-content">
      <van-icon size="20px" color="#CFD4DA" name="info-o" />
      <div style="font-size: 20px; color: #CFD4DA">
        您还没有登录，请登录后查看
      </div>
      <van-button @click="navigateToLogin">登录</van-button>
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
            <order-card :orderInfo="item" @cancelOrder="refreshItemStatus"></order-card>
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

  </div>

</template>

<script>
  import OrderCard from '@/components/OrderCard';
  import {ADD_NEW_ADDRESS,GET_ORDER_LIST} from '@/utils/api';
  import {request} from "@/utils/request";
  import { mapGetters} from 'vuex';
  export default {

  components: {
    OrderCard
  },

  data() {
    return {
      active:0,
      isLogin:false,
      orderItems:{},
      waitCommentItems:{},
      waitPayItems:{}
    }

  },
  methods: {
    onChange(event) {
      console.log(event)

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
          this.waitCommentItems = response.filter(item => item.isComment === 0 && item.orderStatus === 2);
          this.waitPayItems = response.filter(item => item.orderStatus === 1);
        }
      )

    }
  },
    computed: {
      ...mapGetters(
        [
          'userId','token'
        ]
      )
    },
    onShow() {
    if (this.token) {
      this.isLogin = true;
      this.getOrderListByUserId();
    }
    console.log("this.isLogin", this.isLogin);

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
    top: 100px;
    left: 50%;
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
