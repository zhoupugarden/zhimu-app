<template>
  <div class="balance-container">

    <div class="balance-summary">
      <div class="balance-summary__title">
        <div style="color: #b2b2b2;padding: 10px;">
          当前余额
        </div>
      </div>
      <div class="balance-summary__total">
        <div>
          {{balanceRecords.totalAmount}}
        </div>
        <div style="font-size: 12px">元</div>
      </div>
    </div>

    <div style="font-size: 12px; padding:10px;">
      交易明细
    </div>
    <div v-for="(item, index) in balanceRecords.items" :key="index" class="balance-detail">
      <balance-item :balanceDetailItem="item"></balance-item>
    </div>
  </div>
</template>

<script>
  import BalanceItem from '@/components/BalanceItem';
  import {GET_BALANCE_DETAIL} from '@/utils/api';
  import {request} from "@/utils/request";
  import {mapGetters} from 'vuex';
  import {pageUrlEnum} from '@/utils/enums';
  export default {
    components: {
      BalanceItem
    },
    data() {
      return {
        balanceRecords: {}
      }
    },
    methods: {
      balanceDetailList() {
        let params = {};
        request(
          GET_BALANCE_DETAIL,
          'GET',
          params
        ).then(
          response => {
            this.balanceRecords = response;
          }
        )
      }
    },
    computed: {
      ...mapGetters(
        [
          'isLogin'
        ]
      )
    },

    onShow() {
      if (this.isLogin) {
        this.balanceDetailList();
      } else {
        wx.navigateTo(
          {
            url:pageUrlEnum.login_url
          }
        )
      }
    },
    onUnload() {
      //未登录->登录页面->余额页面->我的主页
      let pages = getCurrentPages();
      let prePage = pages[pages.length -2];
      let preUrl = prePage.route;
      if (preUrl === pageUrlEnum.login_url) {
        wx.switchTab({
            url : pageUrlEnum.my_url
          }
        )
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "balance.scss";

</style>

<style lang="scss">
  .cell-balance-class {
    font-size: 12px;
    color: green;
  }

</style>
<style lang="wxss">
  page{
    height: 100%;
    background-color:#F4F4F4 !important;
  }
</style>
