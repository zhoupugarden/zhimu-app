import * as types from './mutation-types'

// 进行涉及到多个全局变量的复杂计算

// export const setOpenId = ({ commit }, { id }) => {
//     commit(types.OPEN_ID, id)
// }
export default {
    setOpenId: ({ commit }, { id }) => commit(openId, id),

    addProductToCart:({state, commit}, data)=> {
      console.log(data)
      let cartItem = state.cartList.find(item => {
        //
        return item.cartItem.skuId === data.skuId
        console.log(item.cartItem.skuId , data.skuId)
      })
      console.log(cartItem)
      if (!cartItem) {
        commit(types.ADD_PRODUCT_TO_CART, data)
      }else {
        commit(types.INCREMENT_INVENTORY, data)
      }
    },
    decrementInventory: ({commit}, {skuId}) => {
      console.log(skuId);
      commit(types.DECREMENT_INVENTORY, {skuId})
    },

    incrementInventory: ({commit}, {skuId}) => {
      console.log(skuId);
      commit(types.INCREMENT_INVENTORY, {skuId})
    },

    delProductFromCart:({commit}, {skuId}) => {
      commit(types.DEL_PRODUCT_FROM_CART, {skuId})
    },
    storeToken: ({commit}, token) => {
      commit(types.TOKEN, token)
    }

}
