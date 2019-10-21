<template>
  <div class="evaluation-container">
    <div class="evaluation-total">
      <evaluation-total></evaluation-total>

    </div>
    <div class="evaluation-detail">
      <evaluation-item></evaluation-item>
    </div>
    <div class="evaluation-switch">
      <div style="font-size: 20px;">
        匿名评价
      </div>
      <div>
        <van-switch :checked="isAnonymous"
                    active-color="#07c160"
                    @change="onChangeSwitch" size="20px"/>
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
  }
  .evaluation-add-button_wrap {
    display: flex;
    justify-content: center;
    padding: 10px 10px;
  }
  .evaluation-switch {
    display: flex;
    margin: 10px 0px;
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
