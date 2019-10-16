<template>
  <div class="evaluationitem-container">
    <div class="evaluation-product-item">
      <div class="product-pic">
        <img :src="productItem.imgUrl" mode="aspectFill" class="img-class">
      </div>
      <div class="product-info">
        <div class="product-info_item">
          <div>{{productItem.name}}</div>
          <div>{{productItem.price}}</div>
        </div>
        <div class="product-info_item">
          <div>{{productItem.attributeName}}</div>
          <div>{{productItem.quantity}}</div>
        </div>
      </div>
    </div>
    <div class="evaluation-score">
      <van-rate :value="rateValue" />
    </div>
    <div class="evaluation-comment">
      <van-field
        :value="message"
        type="textarea"
        placeholder="请输入留言"
        border="true"
      />
    </div>

    <upload width="120rpx" height="120rpx" max="3" @choosed="choosedPics" @delete="deleted" :srcs= "srcList"></upload>


  </div>
  
</template>

<script>

  import Upload from '@/components/Upload';
  import {UploadAliyunOss} from "@/utils/UploadAliyunOss";
  import {GET_OSS_CONFIG} from '@/utils/api';
  import {request} from "@/utils/request";

  export default {

    components: {
      Upload
    },

    name: "EvaluationItem",
    data() {
      return {
        rateValue: 0,
        productItem:{
          imgUrl:'https://img1.qunarzz.com/travel/d8/1704/ea/e2c26c442e55e1b5.jpg_480x360x95_e5675a93.jpg',
          name:"杨宇测试",
          price:10.12,
          attributeName:"个",
          quantity:2
        },
        srcList:[],
        ossConfig: {}
      }
    },
    methods: {
      getOssConfig() {
        request(
          GET_OSS_CONFIG,
          'GET'
        ).then(
          response => {
            this.ossConfig = response;
            console.log("this response", response);
          }
        )

      },
      choosedPics(data) {
        let that = this;
        console.log("data: ", data)
        UploadAliyunOss(
          {
            filePath:data.all[0],
            ossConfig: that.ossConfig,
            success: function (res) {
              console.log("上传成功")
            },
            fail: function (res) {
              console.log("上传失败")
              console.log(res)
            }

          }

        );




      }
    },

    onShow() {
      this.getOssConfig();
    }
  }
</script>

<style scoped>
  .img-class {
    width: 100px;
    height: 100px;
  }
  .evaluation-product-item {
    display: flex;
  }
  .product-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .product-info_item {
    display: flex;
    justify-content:space-around;
  }

</style>
