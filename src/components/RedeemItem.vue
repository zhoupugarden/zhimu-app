<template>
  <div class="redeemitem-container" :class="redeemColor">
    <div style="font-size: 12px; color: white">
      zhimu蛋糕
    </div>
    <div class="column-2">
      <div class="redeem-type" style="font-size: 10px; color: white; writing-mode: vertical-lr">
        代金券
      </div>
      <div class="redeem-value" style="font-size: 30px; font-weight: bolder; color: white">
        100
      </div>
      <div class="redeem-unit" style="font-size: 12px;  color: white;margin-left:2px">
        元
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "",

    computed: {
      redeemColor() {
        return 'red';
      }
    }
  }
</script>

<style lang="scss" scoped>

  .redeemitem-container {
    width: 140px;
    height: 80px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
  .column-2 {
    display: flex;
    align-items: center;
    align-content: baseline;
  }










  .red {
    background-color: red;
  }

</style>
