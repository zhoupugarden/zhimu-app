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
    <van-dialog id="van-dialog" />

  </div>
</template>

<script>
  import PrivilegeItem from '@/components/PrivilegeItem';
  import Dialog from '../../../static/vant/dialog/dialog';
  import { mapGetters } from 'vuex';

  import {CHARGE, MOCK_WX_PAY} from '@/utils/api';
  import {request} from "@/utils/request";

  export default {
    components: {
      PrivilegeItem
    },
    data() {
      return {}
    },
    methods: {
      mockWxPay(data) {
        request(
          MOCK_WX_PAY,
          'POST',
          data
        ).then(
          response => {
            console.log("this response", response);
          //  微信支付成功后，跳转到myvip页面
            let url = "../myvip/main" ;
            console.log("url",url);
            wx.redirectTo({
              url
            });
          }
        )
      },

      charge() {
        let that = this;
        let params = {};
        params.userId = this.userId;
        params.productId = 11;
        params.chargeAmount = 500;
        console.log("charge");
        request(
          CHARGE,
          'POST',
          params
        ).then(
          response => {
            console.log("this response", response);
            let data = {};
            data.out_trade_no = response.orderNo;
            data.transaction_id = response.unifiedOrderNo;
            data.total_fee = 50000;

            Dialog.confirm({
              title: '微信支付',
              message:'确认支付' + data.total_fee + '元'
            }).then(() => {
              that.mockWxPay(data);
            }).catch(() => {
              // on cancel
            });

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
