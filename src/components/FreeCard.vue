<template>
  <div class="freecard-container">
    <img :src="freeItem.fittingUrl" class="freecard-container__pic">
    <div class="freecard-container__name">
      {{freeItem.fittingName}} / ￥ 0.00
    </div>
 <div v-show="holdValue">
   <van-field
     :value="freeItem.value"
     :placeholder="holdValue"
     border="false"
     @change="fieldChange"
   />
 </div>
    <div class="freecard-container_close">
      <van-icon name="cross" @click="delFromCart"></van-icon>
    </div>
  </div>
  <!--免费配件购物车展示-->
</template>

<script>
  export default {
    props: {
      freeItem:Object
    },
    data() {
      return {
        count: 0
      }
    },
    methods: {
      delFromCart() {
        this.$emit("delFromCart" , this.freeItem)
      },
      fieldChange(event) {
        let data = {};
        data.fittingId = this.freeItem.fittingId;
        data.productName = this.freeItem.productName;
        data.value = event.mp.detail;
        this.$emit("fieldChange", data)
      }
    },
    computed: {
      holdValue() {
        console.log("this.freeItem", this.freeItem)
        if (this.freeItem.fittingId === 1001) {
          return "请输入年龄";
        }
        if (this.freeItem.fittingId === 1006) {
          return "请输入祝福语";
        }

      }
    }


  }
</script>
<style lang="scss"  scoped>

  .freecard-container {
    position: relative;
    padding: 5px 15px;
    font-size: 12px;
    /*color: @text-color;*/
    color: #34495e;
    /*background-color: @background-color-light;*/
    background-color: #fafafa;
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
