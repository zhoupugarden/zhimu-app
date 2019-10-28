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
        <van-rate size="30" :value="rateValue" @change="rateChange" />
    </div>
    <div class="evaluation-comment">
      <van-field
        :value="content"
        type="textarea"
        placeholder="请输入留言"
        border="true"
        autosize
        @change="contentChange"
        custom-style="height: 100px;backgroud-color: darkgray;border: 1px solid darkgray;"
      />
    </div>
    <upload width="120rpx" height="120rpx" max="3" @choosed="choosedPics" @delete="deleted" :srcs= "srcList"></upload>
  </div>
  
</template>

<script>

  import Upload from '@/components/Upload';
  import {UploadAliyunOss} from "@/utils/UploadAliyunOss";
  import {request} from "@/utils/request";

  export default {

    props: {
      itemInfo: Object,
      ossConfig: Object,
    },

    components: {
      Upload
    },

    name: "EvaluationItem",
    data() {
      return {
        rateValue: 0,
        srcList:[],
        content:""
      }
    },
    methods: {

      uploadPic(params) {
        this.$emit("picUpload", params)
      },
      choosedPics(data) {
        let that = this;
        console.log("data: ", data);
        let params = {};
        params.productId = that.itemInfo.productId;
        params.picUrls = [];
        for (let url of data.all) {
          //多图片上传
          UploadAliyunOss(
            {
              filePath:url,
              ossConfig: that.ossConfig,
              success: function (res) {
                console.log("上传成功")
                params.picUrls.push(url);
                that.uploadPic(params)
              },
              fail: function (res) {
                console.log("上传失败")
                console.log(res)
              }
            }
          );
        }
      },
      deleted(data) {
        let params = {};
        params.productId = this.itemInfo.productId;
        params.index = data;
        this.$emit("deletePic", params);
      },
      rateChange(event) {
        console.log(event);
        let data = {};
        data.productId = this.itemInfo.productId;
        data.rateValue = event.mp.detail;
        this.$emit("rateChange", data);
      },
      contentChange(event) {
        console.log(event);
        let data = {};
        data.productId = this.itemInfo.productId;
        data.content = event.mp.detail;
        this.$emit("fieldChange", data)
      }
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
