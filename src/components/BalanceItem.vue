<template>
  <div class="balanceitem-container">

    <div class="balanceitem-left">
      <div class="balanceitem-type">
        {{balanceDetailItem.changeDesc}}
      </div>
      <div class="balanceitem-time">
        {{balanceDetailItem.changeDate}}
      </div>
    </div>

    <div
      style="padding-right: 10px; font-size: 12px;"
      :style="{color : activeColor}">
      {{flag}}{{balanceDetailItem.changeAmount}}
    </div>

  </div>
</template>

<script>
  export default {
    name: "balance-item",
    props: {
      balanceDetailItem:Object
    },
    data() {
      return {
        flag: this.balanceDetailItem.changeType === 1 ? "+":"-",
        activeColor:this.balanceDetailItem.changeType === 1 ? "green":"red"
      }
    },
    computed: {
      balanceCount() {
        return {
          blueActive: true
        }
      },
    }

  }
</script>

<style lang="scss" scoped>
  .balanceitem-container {
    display: flex;
    justify-content: space-between;
    background-color: white;
    height: 50px;
    align-items: center;
    font-size: 14px;
  }
  .balanceitem-left {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 10px;
  }
  .redActive {
    color: red;
  }
  .balanceitem-type{
    font-size: 12px;
  }
  .balanceitem-time {
    font-size: 10px;
    color: #b2b2b2;
  }

</style>
