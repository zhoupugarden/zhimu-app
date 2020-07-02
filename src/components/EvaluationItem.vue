<template>
  <div class="evaluationitem-container">

    <div style="border-bottom: 1px solid #f2f2f2;">
      <van-card
        :num="itemInfo.quantity"
        :price="itemInfo.salePrice"
        :desc="itemInfo.attributeName"
        :origin-price="itemInfo.linePrice"
        :title="itemInfo.productName"
        :thumb="itemInfo.picUrl"
        custom-class="root-custom-class"
      ></van-card>
    </div>
    <div class="evaluation-score">
      <span style="font-size: 12px;">商品味道：</span>
      <span style="padding: 0px 10px;"><van-rate color="#e64340" size="14" :value="rateValue" @change="rateChange" /></span>
      <span style="font-size: 12px; color: #e64340; font-weight: bold;">{{rateDesc}}</span>
    </div>
    <div class="evaluation-comment">
      <van-field
        :value="content"
        type="textarea"
        placeholder="亲，蛋糕的味道如何，对包装服务等还满意吗？"
        border="true"
        autosize
        @change="contentChange"
        custom-style="height: 100px;backgroud-color: darkgray;border: 1px solid darkgray;"
      />
    </div>
    <upload width="120rpx" height="120rpx" max="3" @choosed="choosedPics" @delete="deleted" :srcs= "srcList"></upload>
      <div class="point-tip">
        有图评价另有积分加送哦:)
      </div>
  </div>

</template>

<script>

  import Upload from '@/components/Upload';
  import {UploadAliyunOss} from "@/utils/UploadAliyunOss";
  import {request} from "@/utils/request";
  import {evaluationEnum} from '@/utils/enums'

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
        rateDesc:"",
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
                console.log("上传成功", res);
                let ossUrl = res;
                params.picUrls.push(ossUrl);
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
        let data = {};
        data.productId = this.itemInfo.productId;
        data.rateValue = event.mp.detail;
        let rateResult = Object.values(evaluationEnum).find(
          item => {
            return item.value === data.rateValue;

          }
        );
        this.rateDesc = rateResult.desc;
        this.$emit("rateChange", data);
      },
      contentChange(event) {
        let data = {};
        data.productId = this.itemInfo.productId;
        data.content = event.mp.detail;
        this.content = event.mp.detail;
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
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0px;
  }
  .point-tip {
    display: inline-block;
    font-size: 10px;
    margin: 10px;
    background: linear-gradient(left, #f71605, #e0f513);
    background: -webkit-linear-gradient(left, #f71605, #e0f513);
    background: -o-linear-gradient(right, #f71605, #e0f513);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation:scratchy 0.253s linear forwards infinite;
  }
  @keyframes  scratchy {
    0% {
      background-position: 0 0;
    }
    25% {
      background-position: 0 0;
    }
    26% {
      background-position: 20px -20px;
    }
    50% {
      background-position: 20px -20px;
    }
    51% {
      background-position: 40px -40px;
    }
    75% {
      background-position: 40px -40px;
    }
    76% {
      background-position: 60px -60px;
    }
    99% {
      background-position: 60px -60px;
    }
    100% {
      background-position: 0 0;
    }
  }


</style>
