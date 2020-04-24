<script>
  import {wxLogin} from '@/utils/wxApi';
  import {request} from "@/utils/request";
  import {WX_LOGIN} from '@/utils/api';
  import {mapActions} from 'vuex';


  export default {
  created () {
    let that = this;
    console.log("=========app.vue========");

    wxLogin((res) => {
      that.login(res)
    });



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
        'storeToken'
      ]

    ),

    login(res) {
      console.log("======log=====", res);
      let params = {};
      params.wxCode = res.code;
      request(
        WX_LOGIN,
        'post',
        params
      ).then(
        response => {
          console.log("=========response===", response);
          let token = response;
          this.storeToken(token);
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
