// 用gettter取数据到组件里,是数据的映射

// // getter可充当计算属性
// export const currentSong = (state) => {
//     return state.playlist[state.currentIndex] || {}
// }
export default {
    openId: state => state.openId,
    cartList: state => state.cartList,
    token:state => state.token,
    userId: state => state.userId,
    isVip: state => state.isVip,
    cartTotalCount: state => {
      return state.cartList.reduce(
        (count, item) => {
          return count + item.inventory
        }, 0
      )
    },
  cartProductListName: state => {
      let listName = [];
   for (let i = 0; i< state.cartList.length; i++) {
     listName.push(state.cartList[i].cartItem.productName)
   }
      return listName.join('、');
  },
    cartTotalPrice: state => {
      if (state.cartList.length === 0) {
        return 0
      } else {
        return state.cartList.reduce(
          (total, cartListItem) => {
            return total + cartListItem.cartItem.salePrice * cartListItem.inventory
          }, 0
        )
      }
    },
    productCartList: state => state.cartList.filter(
      item => item.cartItem.type != 2
    ),
    freeCartList: state => state.cartList.filter(
      item => item.cartItem.type === 2
    ),
    isExistCake: state => {
      let cakeList = state.cartList.find(
        item => item.cartItem.type === 1
      );
      if (cakeList === undefined ||cakeList.length === 0) {
        return false;
      }else {
        return true;
      }
    }
}
