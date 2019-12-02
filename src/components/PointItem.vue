<template>
  <div class="pointitem-container">
    <div class="pointitem-left">
      <div class="pointitem-type">
        {{pointDetailItem.changeDesc}}
      </div>
      <div class="pointitem-time">
        {{pointDetailItem.changeDate}}
      </div>
    </div>
    <div
      style="padding-right: 10px;"
      :style="{color : activeColor}">
      {{flag + pointDetailItem.changeAmount}}
    </div>
  </div>

</template>

<script>
  export default {
    name: "point-item",
    props: {
      pointDetailItem:Object
    },
    data() {
      return {
        flag: this.pointDetailItem.changeType === 1 ? "+":"-",
        activeColor:this.pointDetailItem.changeType === 1 ? "green":"red"
      }
    }

  }
</script>

<style lang="scss" scoped>
  .pointitem-container {
    display: flex;
    justify-content: space-between;
    background-color: white;
    height: 50px;
    align-items: center;
    font-size: 14px;
  }
  .pointitem-left {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 10px;
  }
  .redActive {
    color: red;
  }

</style>
