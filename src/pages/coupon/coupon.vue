<template>
  <div class="coupon-container">
    <coupon-item></coupon-item>
    <coupon-item></coupon-item>
  </div>
</template>

<script>
  import CouponItem from '@/components/CouponItem';
  export default {
    components: {
      CouponItem
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
