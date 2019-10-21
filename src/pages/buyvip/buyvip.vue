<template>
  <div class="buyvip-container">
    <div style="font-size: 18px; font-weight: bold; padding-top: 20px">
      充值500元余额+1年初艺会员
    </div>
    <div>
      <privilege-item></privilege-item>
    </div>
    <div class="buy-vip-cell">
      <van-cell-group>
        <van-cell title="服务名称" value-class="cell-value" value="500元余额+1年初艺会员" />
        <van-cell title="应付金额" value="￥500"  />
      </van-cell-group>
    </div>
    <div class="buy-vip-button">
      <van-button type="primary" size="large" @click="charge">立即支付</van-button>
    </div>

  </div>
</template>

<script>
  import PrivilegeItem from '@/components/PrivilegeItem';
  import { mapGetters } from 'vuex';

  import {CHARGE} from '@/utils/api';
  import {request} from "@/utils/request";

  export default {
    components: {
      PrivilegeItem
    },
    data() {
      return {}
    },
    methods: {
      charge() {
        let params = {};
        params.userId = this.userId;
        params.productId = 9;
        params.chargeAmount = 500;
        console.log("charge");
        request(
          CHARGE,
          'POST',
          params
        ).then(
          response => {
            console.log("this response", response);
          }
        )
      }
    },
    computed: {
      ...mapGetters(
        [
          'userId','isVip'
        ]
      ),
    }
  }
</script>

<style lang="scss" scoped>
  .buyvip-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .buy-vip-button {
    position: fixed;
    bottom: 10px;
    width: 90%;
  }
  .buy-vip-cell {
    width: 90%;
    margin-top: 20px;
  }

</style>

<style lang="wxss">
  page{
    height: 100%;
    background-color:#F4F4F4 !important;
  }
</style>

<style lang="scss">
  .cell-value {
    font-size: 14px;
    font-weight: bolder;
  }
</style>
