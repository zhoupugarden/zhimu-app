<template>
  <div class="evaluation-container">
    <div class="evaluation-total">
      <evaluation-total></evaluation-total>

    </div>
    <div class="evaluation-detail">
      <evaluation-item></evaluation-item>
    </div>
    <div class="evaluation-switch">
      <div style="font-size: 24px;">
        匿名评价
      </div>
      <div style="z-index: -1">
        <van-switch :checked="isAnonymous" @change="onChangeSwitch" size="24px"/>
      </div>

    </div>

    <div class="evaluation-add-button">
      <div class="evaluation-add-button_wrap">
        <van-button round
                    custom-class="custom-button"
                    @click="navigateToNew"
                    type="primary">立即评价</van-button>
      </div>
    </div>
  </div>

</template>

<script>
  import EvaluationItem from '@/components/EvaluationItem';
  import EvaluationTotal from '@/components/EvaluationTotal';


  export default {
    components: {
      EvaluationItem, EvaluationTotal
    },
    data() {
      return {
        isAnonymous:true
      }
    },
    methods: {
      onChangeSwitch(event) {
        console.log(event)
        this.isAnonymous = event.mp.detail;
      }

    },
    computed: {
    }

  }
</script>

<style lang="scss" scoped>

  .evaluation-add-button {
    position: fixed;
    bottom: 0px;
    width: 100%;
    background-color: white;
    margin-top: 10px;
  }
  .evaluation-add-button_wrap {
    display: flex;
    justify-content: center;
    padding: 10px 10px;
  }
  .evaluation-switch {
    display: flex;
    z-index: -1;
  }

</style>

<style lang="scss">
  .custom-button {
    padding:0 120px !important;
  }
</style>

<style lang="wxss">
  page{
    height: 100%;
    background-color:#F4F4F4 !important;
  }
</style>
