<template>
  <div class="point-container">

    <div class="point-summary">
      <div class="point-summary__title">
        <div style="color: #999999">
          当前积分
        </div>
        <div style="color: green">
          <van-cell
            title="积分说明"
            title-class="cell-point-class"
            link-type="navigateTo"
            url="/pages/pointhelp/main"
          />
        </div>

      </div>
      <div class="point-summary__total">
        {{pointRecords.totalAmount}}
        <div style="font-size: 12px">分</div>
      </div>
    </div>

    <div style="font-size: 14px; padding-top: 10px;padding-bottom: 10px">
      积分记录
    </div>

    <div v-for="(item, index) in pointRecords.items" :key="index" class="point-detail">
      <point-item :pointDetailItem="item"></point-item>
    </div>

  </div>

</template>

<script>
  import PointItem from '@/components/PointItem';
  import {GET_POINT_DETAIL} from '@/utils/api';
  import { mapGetters} from 'vuex';
  import {request} from "@/utils/request";
  export default {
    components: {
      PointItem
    },
  data() {
    return {
      pointRecords: {
      },
      userInfo: {}
    }
  },
  methods: {
    pointDetailList() {
      let params = {};
      params.userId = this.userId;
      request(
        GET_POINT_DETAIL,
        'GET',
        params
      ).then(
        response => {
          this.pointRecords = response;
          console.log("this response", response);
        }
      )
    },
    getUserInfo(token) {
      let params = {};
      params.token = token;
      request(
        MY_USER_INFO,
        'GET',
        params
      ).then(
        response => {
          //将userID放在存储中
          console.log("response",response)
          this.userInfo = response;
        }
      )
    }

  },
    computed: {
      ...mapGetters(
        [
          'userId','isLogin'
        ]
      )
    },
    onUnload() {
      let pages = getCurrentPages();
      let prePage = pages[pages.length -2];
      let preUrl = prePage.route;
      if (preUrl === "pages/login/main") {
        wx.switchTab({
            url : "/pages/my/main"
          }
        )
      }
    },
    onShow() {
      this.pointDetailList();
    }


  }
</script>

<style lang="scss" scoped>

  .point-summary__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    font-size: 12px;
  }
  .point-summary__total {
    background-color: white;
    font-size: 30px;
    color: green;
    display: flex;
    justify-content: center;
  }
</style>

<style lang="scss">
  .cell-point-class {
    font-size: 12px;
    color: green;
  }

</style>

<style lang="wxss">
  page{
    height: 100%;
    background-color:#F4F4F4 !important;
  }
</style>
