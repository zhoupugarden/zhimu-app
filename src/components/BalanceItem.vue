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
    <div class="balanceitem-right">
      <div
        style="padding-right: 10px; font-size: 12px;"
        :style="{color : activeColor}">
        {{flag}}{{balanceDetailItem.changeAmount}}
      </div>
      <div class="balanceitem-time">
        余额：{{balanceDetailItem.balanceAmount}}
      </div>
    </div>
  </div>
</template>

<script>

  import {merchantStatusEnum} from '@/utils/enums'

  export default {
    name: "balance-item",
    props: {
      balanceDetailItem:Object
    },
    data() {
      return {
        merchantStatus:merchantStatusEnum
      }
    },
    computed: {
      balanceCount() {
        return {
          blueActive: true
        }
      },
      flag() {
        if (this.balanceDetailItem.changeType === 1) {
          return "+";
        } else {
          return "-";
        }
      },
      activeColor() {
        if (this.balanceDetailItem.changeType === 1) {
          return "#09BB07";
        } else {
          return "#e64340";
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
    border-bottom: 1px solid #f2f2f2;
  }
  .balanceitem-left {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 10px;
  }
  .balanceitem-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100px;
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
