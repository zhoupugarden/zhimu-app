import * as types from './mutation-types'

//调用检查商品库存数量的后台接口，然后更新
// import shop from '../../api/shop'


const mutations = {
    // [方法名](参数1,参数2...){方法}
    [types.ADD_PRODUCT_TO_CART](state, cartItem) {
      console.log(cartItem)
      state.cartList.push({
        cartItem,
        inventory:1
      });
    },

    [types.DECREMENT_INVENTORY](state, {skuId}) {
      let cartItem = state.cartList.find(item => item.cartItem.skuId === skuId)
      cartItem.inventory--
    },
    [types.INCREMENT_INVENTORY](state, {skuId}) {
      let cartItem = state.cartList.find(item => item.cartItem.skuId === skuId)
      cartItem.inventory++

    },
    [types.DEL_PRODUCT_FROM_CART](state, {skuId}) {
      let index = state.cartList.findIndex( item => item.cartItem.skuId = skuId)
      console.log("index", index);
      state.cartList.splice(index, 1);
    },
    [types.CHECK_OUT_CART](state) {

    },


}

export default mutations;
