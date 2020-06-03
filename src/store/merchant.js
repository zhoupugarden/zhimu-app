import {INDEX_INFO} from '@/utils/api';
import {request} from "@/utils/request";


const state = {
  merchantInfo:{},
  deliverConfig:{},
  adHeadSettings:null
};


const mutations = {
  setMerchantData(state, params) {
    state.merchantInfo = params.merchantInfo;
    state.deliverConfig = params.deliverConfig;
    state.adHeadSettings = params.adSettings.find(a => a.adType === 1002) ? params.adSettings.find(a => a.adType === 1002) : null;
    console.log(state.merchantInfo);
  }
};

const actions = {
//  请求获取商家的菜单数据
  async getMerchantData(context, params) {
    try {
      await request(
        INDEX_INFO,
        'get'
      ).then(
        response => {
          console.log("====getMerchantData=====", response);
          let merchantInfo = response.merchantConfigDto;
          let deliverConfig = response.deliverConfigDto;
          let adSettings = response.adSettings;
          context.commit('setMerchantData', {merchantInfo, deliverConfig, adSettings});
        }
      )
    }catch (error) {

    }
  }

};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
