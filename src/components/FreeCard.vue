<template>
  <div class="freecard-container">
    <img :src="freeItem.fittingUrl" class="freecard-container__pic">
    <div class="freecard-container__name">
      {{freeItem.fittingName}} ({{extroValue}}) / ￥ 0.00
    </div>

    <van-stepper :value="valueCount" @change="fieldChange" />

    <div class="freecard-container_close">
      <van-icon name="cross" @click="delFromCart"></van-icon>
    </div>
    <van-toast  id="van-toast"/>
  </div>

</template>

<script>

  import {toast} from '@/utils/toast';

  export default {
    props: {
      freeItem:Object,
      extroValue:String
    },
    data() {
      return {
        count: 0,
        valueCount:1
      }
    },
    methods: {
      delFromCart() {
        this.$emit("delFromCart" , this.freeItem)
      },
      fieldChange(event) {
        let changeValueCount = event.mp.detail;

        let maxCount = this.freeItem.maxCount;
        if (changeValueCount >= maxCount) {
          toast("最多赠送" + maxCount + "个，" + "如需更多请与客服联系");
          return;
        }
        this.valueCount = changeValueCount;
        console.log("this.event", event);
        console.log("freeItem", this.freeItem);


      }
    },
    computed: {

    }


  }
</script>
<style lang="scss"  scoped>

  .freecard-container {
    position: relative;
    padding: 5px 15px;
    font-size: 12px;
    color: #34495e;
    box-sizing: border-box;
    display:flex;
    justify-content: space-around;
    align-items: center;
  .freecard-container__pic {
    position: relative;
    width: 40px;
    height: 40px;
  }
  }
</style>
