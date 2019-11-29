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
        flag:"+",
        activeColor:'green'
      }
    },
    watch: {
      pointDetailItem(val) {
        if (val.changeType === 1) {
          this.activeColor = 'green';
        } else {
          this.activeColor = 'red';
          this.flag = '-';
        }
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
