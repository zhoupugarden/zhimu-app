<template>
  <div class="balance-container">

    <div class="balance-summary">
      <div class="balance-summary__title">
        <div style="color: #999999">
          当前余额
        </div>
      </div>
      <div class="balance-summary__total">
        {{balanceRecords.totalAmount}}
        <div style="font-size: 12px">元</div>
      </div>
    </div>

    <div style="font-size: 14px; padding-top: 10px;padding-bottom: 10px">
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
        params.userId = this.userId;
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
          'userId'
        ]
      )
    },

    onShow() {
      this.balanceDetailList();
    }



  }
</script>

<style lang="scss" scoped>

  .balance-summary__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    font-size: 12px;
  }
  .balance-summary__total {
    background-color: white;
    font-size: 30px;
    color: green;
    display: flex;
    justify-content: center;
  }
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
