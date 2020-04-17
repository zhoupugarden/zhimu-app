import {INDEX_LIST, INDEX_INFO} from '@/utils/api';
import {request} from "@/utils/request";

const state = {
  categoryNameList:[],
  productList:[]
};

const mutations = {
  setHomeData(state, params) {
    state.categoryNameList = params.categoryNameList;
    state.productList = params.productList;
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
         let productList = [];
         for (let category of categoryList) {
           let categoryNameItem = {};
           categoryNameItem.name = category.name;
           categoryNameItem.id = category.id;
           categoryNameList.push(categoryNameItem);
           productList.push(category.pmsProductPlusList);
         }
         context.commit('setHomeData', {categoryNameList, productList});
         console.log("this.productList========", productList);
         console.log("this.categoryNameList====", categoryNameList)
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
