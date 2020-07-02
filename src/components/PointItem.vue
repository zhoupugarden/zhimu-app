<template>
  <div class="pointitem-container">
    <div class="pointitem-left">
      <div >
        <span class="pointitem-type" >{{pointDetailItem.changeDesc}}</span>
      </div>
      <div class="pointitem-time">
        {{pointDetailItem.changeDate}}
      </div>
    </div>
    <div class="pointitem-right">
      <div
        style="padding-right: 10px; font-size: 12px;"
        :style="{color : activeColor}">
        {{flag + pointDetailItem.changeAmount}}
      </div>
      <div class="pointitem-time">
        剩余：{{pointDetailItem.pointAmount}}
      </div>

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
        activeColor:this.pointDetailItem.changeType === 1 ? "#09BB07":"#e64340"
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
    border-bottom: 1px solid #f2f2f2;
  }
  .pointitem-left {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 10px;
  }
  .pointitem-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100px;
  }
  .redActive {
    color: red;
  }
  .pointitem-type{
    font-size: 12px;
    padding: 5px 0px;
  }
  .pointitem-time{
    font-size: 10px;
    color: #b2b2b2;
  }

</style>
