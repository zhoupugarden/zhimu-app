<template>
  <div class="pointitem-container">

    <div class="pointitem-left">
      <div class="pointitem-type">
        {{pointItem.type}}
      </div>
      <div class="pointitem-time">
        {{pointItem.time}}
      </div>
    </div>

    <div
      style="padding-right: 10px;"
      :style="{color : activeColor}">
      {{pointItem.count}}
    </div>

  </div>
  
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        pointItem: {
          type:"消费",
          time:"2019-10-10 10:10:10",
          count:"79"
        }
      }
    },
    computed: {
      pointCount() {
        return {
          blueActive: true
        }
      },
      activeColor() {
        if (this.pointItem.count > 0) {
          return 'green';
        }else {
          return 'red';
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
