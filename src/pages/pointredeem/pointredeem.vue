<template>
  <div class="redeem-container">

    <div class="redeem-header">
      <div class="redeem-header-total">
        <div style="color: #CDA65B">
          78
        </div>
        <div style="color: #ACC0D8; font-size: 14px">
          可用积分
        </div>
      </div>
      <div class="redeem-header-operation">
        <div class="redeem-header-operation_left">积分明细</div>
        <div class="redeem-header-operation_split"></div>
        <div class="redeem-header-operation_right">兑换记录</div>
      </div>

    </div>

    <div class="redeem-detail">

      <redeem-container></redeem-container>

    </div>

  </div>
</template>

<script>
  import RedeemContainer from '@/components/RedeemContainer';

  export default {
    components: {
      RedeemContainer
    },
    data() {
      return {
        balanceRecords: {
          total: 798
        }
      }
    },
    methods: {

    }

  }
</script>

<style lang="scss" scoped>

  .redeem-header-total {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    padding: 10px 0px;

  }

  .redeem-header-operation {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: white;
    padding: 10px 0px;
  }

  .redeem-header-operation_left {
    font-size: 14px;
    font-weight: bolder;
  }
  .redeem-header-operation_right {
    font-size: 14px;
    font-weight: bolder;
  }
  .redeem-header-operation_split {
    float:left;
    width: 1px;
    height: 20px;
    background: #e6ebf3;
  }




</style>

<style lang="scss">

</style>

<style lang="wxss">
  page{
    height: 100%;
    background-color:#F4F4F4 !important;
  }
</style>
