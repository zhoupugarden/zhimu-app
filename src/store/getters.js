// 用gettter取数据到组件里,是数据的映射

// // getter可充当计算属性
// export const currentSong = (state) => {
//     return state.playlist[state.currentIndex] || {}
// }
export default {
    openId: state => state.openId,
    cartList: state => state.cartList,
    cartTotalPrice: state => {
      return state.cartList.reduce(
        (total, cartListItem) => {
          return total + cartListItem.cartItem.salePrice * cartListItem.inventory
        }, 0
      )

    },
    productCartList: state => state.cartList.filter(
      item => item.cartItem.type != 3
    ),
    freeCartList: state => state.cartList.filter(
      item => item.cartItem.type === 3
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
