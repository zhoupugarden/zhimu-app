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
  import { mapGetters} from 'vuex';
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
            console.log("this response", response);
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
            url:'/pages/login/main'
          }
        )
      }
    },
    onUnload() {
      let pages = getCurrentPages();
      let prePage = pages[pages.length -2];
      let preUrl = prePage.route;
      if (preUrl === "pages/login/main") {
        wx.switchTab({
            url : "/pages/my/main"
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
