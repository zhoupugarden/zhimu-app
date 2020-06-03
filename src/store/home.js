import {INDEX_LIST, INDEX_INFO} from '@/utils/api';
import {request} from "@/utils/request";

const state = {
  categoryNameList:[],
  productMenuList:[]
};

const mutations = {
  setHomeData(state, params) {
    state.categoryNameList = params.categoryNameList;
    state.productMenuList = params.productMenuList;
  }
};

const actions = {
//  请求获取商家的菜单数据
  async getHomeData(context, params) {
    try {
      await request(
        INDEX_LIST,
        'get'
      ).then(
       response => {
         console.log("====getHomeData=====", response);
         let categoryList = response;
         let categoryNameList = [];
         let productMenuList = [];
         for (let category of categoryList) {
           //初始化category数据
           categoryNameList.push(category.categoryDto);
           //初始化product数据
           let productOfCategory = category.productDtoList;
           productMenuList.push(productOfCategory);
         }
         context.commit('setHomeData', {categoryNameList,productMenuList});
         console.log("this.categoryNameList====", categoryNameList);
         console.log("this.productMenuList====", productMenuList);
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
