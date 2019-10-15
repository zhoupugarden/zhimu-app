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
      style="padding-right: 10px;"
      :style="{color : activeColor}">
      {{balanceDetailItem.changeAmount}}
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
      }
    },
    computed: {
      balanceCount() {
        return {
          blueActive: true
        }
      },
      activeColor() {
        if (this.balanceDetailItem.changeType === 1) {
          return 'green';
        }else {
          return 'red';
        }
      }
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

</style>
