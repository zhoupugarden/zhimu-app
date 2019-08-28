<template>
  <div class="balanceitem-container">


    <div class="balanceitem-left">
      <div class="balanceitem-type">
        {{balanceItem.type}}
      </div>
      <div class="balanceitem-time">
        {{balanceItem.time}}
      </div>
    </div>

    <div
      style="padding-right: 10px;"
      :style="{color : activeColor}">
      {{balanceItem.count}}
    </div>

  </div>
</template>

<script>
  export default {
    name: "balance-item",
    data() {
      return {
        balanceItem: {
          type:"消费",
          time:"2019-10-10 10:10:10",
          count:"79"
        }
      }
    },
    computed: {
      balanceCount() {
        return {
          blueActive: true
        }
      },
      activeColor() {
        if (this.balanceItem.count > 0) {
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
