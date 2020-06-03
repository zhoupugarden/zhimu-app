<script>
  import {mapActions} from 'vuex';
  import {request} from "@/utils/request";


  export default {
  created () {
    console.log("=========app.vue========");

    //添加用户当前location地址

    //添加广告配置、运费配置、商户信息配置

    this.$store.dispatch('merchant/getMerchantData');

    let logs;
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({key: 'logs'}).data || [];
      logs.unshift(Date.now());
      mpvue.setStorageSync({
        key: 'logs',
        data: logs
      })
    } else {
      logs = mpvue.getStorageSync('logs') || [];
      logs.unshift(Date.now());
      mpvue.setStorageSync('logs', logs)
    }
  },
  methods: {

    ...mapActions(
      [
        'storeToken','addMerchantInfo', 'addDeliverConfig', 'addAdSettings'
      ]

    ),

    indexInfo() {
      let that = this;
      request(
        INDEX_INFO,
        'GET'
      ).then(
        response => {
          console.log("this response", response);
          let config = response.zmDeliverConfig;
          let settings = response.adSettings;
          let merchantInfo = response.zmMerchant;
          that.addMerchantInfo(merchantInfo);
          that.addAdSettings(settings);
          that.addDeliverConfig(config);
        }
      )
    }

  },

  log () {
    console.log(`log at:${Date.now()}`)
  }
}
</script>

<style>
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  * {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}

  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
