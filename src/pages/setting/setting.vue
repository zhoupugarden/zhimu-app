<template>
  <div class="mysetting-container">
    <div>
      <van-cell title="个人资料" is-link @click="navigateToMySetting" />
    </div>

    <div style="padding-top: 100px;display: flex;justify-content: center">
      <van-button round
                  custom-class="custom-button"
                  @click="logoutApp"
                  type="primary">退出账号</van-button>
    </div>
  </div>

</template>

<script>
  import {  mapActions } from 'vuex';

  export default {


  components: {
  },

  data() {
    return {

    }

  },

  methods: {
    ...mapActions(
      [
        'logout'
      ]
    ),

    logoutApp() {
      this.logout();
    },
    navigateToMySetting() {
      let url = "/pages/mysetting/main";
      wx.navigateTo(
        {
          url
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>

  .mysetting-header {
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: white;
    height: 100px;
  }
  .mysetting-detail {
    margin-top: 10px;
  }

  .circleImg {
    border-radius: 30px;
    width:60px;
    height:60px;
  }

  .radio-flex {
    display: flex;
    width: 200px;
    justify-content: space-between;
    font-size: 14px;
  }
  .sex-flex {
    display: flex;
    background-color: white;
    align-items:center;
  }

</style>

<style lang="wxss">
  page{
    height: 100%;
    background-color:#F4F4F4 !important;
  }
</style>

<style lang="scss">
  .small-radio-icon {

  }
  .custom-button {
    /*width: 90%;*/
    padding:0 120px !important;
  }
</style>
