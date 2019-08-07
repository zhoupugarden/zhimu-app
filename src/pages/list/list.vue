<template>
  <div class="container">
      <van-tabs :active="active" @change="getProductInfoByCategoryId" animated>
      <van-tab v-for="(item, index) in categoryInfo" :title="item.name" :key="index" >
        <!--连续两个v-for index名称不能相同-->
        <card  v-for="(item, index_) in cardInfo" :cardInfo="item" :key="item.id"
        ></card>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>

  import card from '@/components/card';
  import {GET_PRODUCT_CATEGORY_URL, GET_PRODUCT_BY_CATEGORY_ID} from '@/utils/api';
  import {request} from "@/utils/request";

  export default {
    components: {
      card
    },
    data() {
      return {
        active: 1,
        productId: 1234,
        categoryInfo: {},
        cardInfo: {},
        cakeCardInfo: {
          name: "蛋糕",
          englishName: "Toast",
          headUrl:"https://static.excake.com/media/5fcaa940-5af7-42b4-a10b-86fc0ae51580.jpg?imageView2/1/w/600/h/600"
        }
      }
    },
    methods: {
      async getProductCategory() {
        let categoryInfo = await request(
          GET_PRODUCT_CATEGORY_URL,
          'GET',
          {}
        );
        this.categoryInfo = categoryInfo;
        this.getProductInfoByCategoryId2(this.categoryInfo[0].id);
      },
      async getProductInfoByCategoryId(event) {
        this.cardInfo = {};
        console.log(event);
        let index = event.target.index;
        let categoryId = this.categoryInfo[index].id;
        let cardInfo = await request(
          GET_PRODUCT_BY_CATEGORY_ID,
          'GET',
          {categoryId: categoryId}
        );
        this.cardInfo = cardInfo;
        console.log(this.cardInfo);
      },
      async getProductInfoByCategoryId2(categoryId) {
        let cardInfo = await request(
          GET_PRODUCT_BY_CATEGORY_ID,
          'GET',
          {categoryId: categoryId}
        );
        this.cardInfo = cardInfo;
        console.log(this.cardInfo);
      },

      navigateToProduct() {
        console.log("navigateToProduct")
        var url = "../detail/main?productId=" + this.productId
        wx.navigateTo({
          url
        });
      }

    },
    created() {
      console.log("index 页面初始化");
      this.getProductCategory();
    },

    onLoad(options) {
      console.log(options)
    },
    mounted() {
      console.log(this.$root.$mp.query.active);
    }


  }
</script>

<style lang="scss" scoped>


</style>
