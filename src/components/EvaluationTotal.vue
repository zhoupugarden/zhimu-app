<template>
  <div class="evaluationtotal-container">
    <div class="deliver-info">
      <div class="deliver-info_user">
        骑手：{{orderInfo.deliverName}}
      </div>
      <hr style="border: 1px solid darkgray; margin: 2px 0px" />
      <div class="deliver-info_time">
        配送日期：{{orderInfo.deliverDate}}
        配送时间：{{orderInfo.deliverTime}}
      </div>
    </div>
    <div class="total-score">
      <van-rate size="30" :value="rateValue" @click="activeTags"/>
    </div>
    <div v-if="isActive" class="total-tags">
      <div v-for="(item, index) in tagDescs" :key="index" >
        <van-tag round size="medium" @click="chooseTag(index)" :color="tagColor[index]">{{item}}</van-tag>
      </div>
    </div>
  </div>
  
</template>

<script>

  const activeColor = "#f2826a";
  export default {
    name: "EvaluationTotal",

    props: {
      orderInfo: Object
    },

    data() {
      return {
        isActive:false,
        rateValue: 0,
        tagDescs:["骑手服务好", "准时送达", "风雨无阻", "蛋糕完好", "送货上门"],
        tagColor:["","","","",""],
        choosedTag:[],
        orderInfo:{
          "deliverName":"杨宇",
          "deliverTime":"10:00:00-12:00:00",
          "deliverDate":"2019-10-10"
        }
      }
    },
    methods: {
      chooseTag(event) {
        console.log("changeTag", event);
        let tagId = event;
        if (this.choosedTag.indexOf(this.tagDescs[tagId]) === -1) {
          console.log("不存在");
          this.choosedTag.push(this.tagDescs[tagId]);
          this.tagColor[tagId] = activeColor;
        }else {
          this.choosedTag.splice(this.choosedTag.indexOf(this.tagDescs[tagId]), 1);
          this.tagColor[tagId] = "";
        }
        console.log(this.choosedTag)
      },
      activeTags() {
        this.isActive=true
      }
    }

  }
</script>

<style lang="scss" scoped>
  .total-tags {
    display: flex;
    justify-content:space-around;
  }
  .evaluationtotal-container {
    background-color: white;
    margin: 5px;
    padding: 5px;
  }
  .deliver-info_time {
    font-size: 12px;
  }
  .deliver-info {
    font-size: 20px;
  }
  .total-score {
    text-align:center;
  }

</style>
