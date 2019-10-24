<template>
  <div class="evaluationitem-container">
    <div class="evaluation-product-item">
      <div class="product-pic">
        <img :src="itemInfo.picUrl" mode="aspectFill" class="img-class">
      </div>
      <div class="product-info">
        <div class="product-info_item">
          <div>{{itemInfo.productName}}</div>
          <div>{{itemInfo.salePrice}}</div>
        </div>
        <div class="product-info_item">
          <div>{{itemInfo.attributeName}}</div>
          <div>{{itemInfo.quantity}}</div>
        </div>
      </div>
    </div>
    <hr style="border: 1px solid darkgray; margin: 2px 0px" />
    <div class="evaluation-score">
      <span style="font-size: 12px;">味道</span>
      <van-rate size="30" :value="rateValue" />
    </div>
    <div class="evaluation-comment">
      <van-field
        :value="message"
        type="textarea"
        placeholder="请输入留言"
        border="true"
        autosize
        custom-style="height: 100px;backgroud-color: darkgray;border: 1px solid darkgray;"
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

    props: {
      itemInfo: Object
    },

    components: {
      Upload
    },

    name: "EvaluationItem",
    data() {
      return {
        rateValue: 0,
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
        console.log("data: ", data);

        //多图片上传

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
  .evaluationitem-container {
    background-color: white;
    margin: 5px;
    padding: 5px;
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
  .evaluation-score {
    text-align: center;
  }

</style>
