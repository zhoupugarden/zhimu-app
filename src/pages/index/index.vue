<template>
  <div class="container">
    <div class="swipe">
      <swiper class="category-c" indicator-dots="true" indicator-color="#999"
              autoplay="true" interval="5000" duration="1000" indicator-active-color="#FFC24A">
        <div v-for="(item, index) in recommendProducts" :key="index">
          <swiper-item>
                <img class="item-img" :src="item.url"  mode="aspectFill" @click="navigateToProduct">
          </swiper-item>
        </div>
      </swiper>
    </div>
    <div class="index_category">
      <van-row gutter="15">
        <van-col v-for="(item, index) in iconList" :key="index"
                 span="6" custom-class="col_hh">
          <img class="svg_icon" :src="item.iconUrl" @click="navigateToList(item)"/>
          <div class="text_hh">{{item.iconName}}</div>
        </van-col>
      </van-row>
    </div>
    <div class="index_nav">
      <van-cell
        is-link
        title="推荐购买"
        link-type="navigateTo"
        value="更多"
        url="/pages/list/main"
      />
    </div>
    <div class="index_card">
      <card  v-for="(item, index_) in hotProducts" :cardInfo="item" :key="index_"
      ></card>
    </div>

  </div>
</template>

<script>
  import card from '@/components/card';
  import {GET_HOT_PRODUCTS_INFO} from '@/utils/api';
  import {request} from "@/utils/request";
  export default {
    components: {
      card
    },
  data() {
    return {
      hotProducts:[],
      iconList: [
        {
          "iconUrl":"/static/svg/icon_cake_coloured.svg",
          "iconName": "慕斯蛋糕"

        },
        {
          "iconUrl":"/static/svg/icon_cake_coloured.svg",
          "iconName": "奶油蛋糕"

        },
        {
          "iconUrl":"/static/svg/icon_cake_coloured.svg",
          "iconName": "现烤面包"

        },
        {
          "iconUrl":"/static/svg/icon_cake_coloured.svg",
          "iconName": "水果茶饮"

        }
      ],
      recommendProducts: [
        {
          "url":"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2110043351,777600299&fm=15&gp=0.jpg"

        },
        {
          "url":"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3914758650,85542706&fm=26&gp=0.jpg"

        },
        {
          "url":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564905069188&di=c16925fd532081963e83ac2930cad37e&imgtype=0&src=http%3A%2F%2Fimg6.ph.126.net%2FURpAxxOED0FrXOIiD_V3vA%3D%3D%2F2733403498854464136.jpg"

        }
      ],
      active:2
    }
  },
  methods: {
    onChange() {
      console.log("onChange")
    },
    navigateToList(event, item) {
      console.log(event);
      console.log(item);
      var url = "../list/main?active=" + this.active
      wx.navigateTo({
        url
      });
    },
    navigateToProduct() {
      console.log("navigateToProduct hhhh");
    },
    async getHotProductsInfo() {
      let hotProducts = await request(
        GET_HOT_PRODUCTS_INFO,
        'GET',
        {}
      );

    //  后续要把名字和方法都优化 统一定义card 所需要的product 信息, 不要再这样转化
      console.log(JSON.parse(hotProducts[0].urls).headUrl);
      for (let i = 0; i < hotProducts.length; i++) {
        let hotProduct = {};
        hotProduct.productId = hotProducts[i].productId;
        hotProduct.name = hotProducts[i].productName;
        hotProduct.englishName = hotProducts[i].productEname;
        hotProduct.headUrl = JSON.parse(hotProducts[i].urls).headUrl;
        hotProduct.salePrice = hotProducts[i].salePrice;
        this.hotProducts.push(hotProduct)
      }
      console.log("this.hotProduct: ",this.hotProducts)
    }
  },
  created() {
    this.getHotProductsInfo();
    }
}
</script>

<style lang="scss" >
  custom_style {
    display: block;
    margin: 20px 0 10px;
    color: #323233;
  }
  /*注意class 加.  和不加.的区别*/
  /*使用vant组件的时候不要忘记引入*/

  .svg_icon {
    width: 28px;
    height: 28px;
  }

  .text_hh {
    font-size: 10px ;

  }
  .col_hh {
    display:block ;
  }
  .index_category {
    margin-top: 15px;
    margin-left: 15px;
  }


</style>
