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
      this.navigateToMyPage();
    },

    navigateToMyPage() {
      let url = "/pages/my/main";
      wx.switchTab(
        {
          url
        }
      )
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
  @import "setting.scss";
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
