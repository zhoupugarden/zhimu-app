export function getAuth(scope, callback) {
  wx.getSetting(
    {
      success: res => {
      //  如果已授权
        if (res.authSetting[scope]) {
          callback();
        }else {
          wx.authorize(
            {
              scope,
              success: callback,
              fail: () => {
                wx.showModal(
                  {
                    title: '亲爱的用户', //提示的标题,
                    content: '同意我们的授权，让我们为你提供更加优质的服务', //提示的内容,
                    showCancel: false, //是否显示取消按钮,
                    confirmText: '去设置', //确定按钮的文字，默认为取消，最多 4 个字符,
                    confirmColor: '#3CC51F',   //确定按钮的文字颜色
                    success: res => {
                      wx.openSetting(
                        {
                          success(res) {
                            console.log("openSetting===", res);
                          }

                        }
                      );
                    }

                  }
                )
              }
            }
          )
        }
      }
    }
  )
}

export function getLocation() {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        resolve(res);
      }
    })
  })
}

export  function  getUserWxInfo() {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      type: 'scope.userInfo',
      success(res) {
        resolve(res);
      }
    })
  })
}


export  function subscribeMessage(subscribeType, callback) {
  return new Promise((resolve, reject) => {
    wx.requestSubscribeMessage({
      tmplIds: subscribeType,
      success(res) {
        callback(res);
      }
    })
  })
}

export function wxLogin(callback) {

  console.log("=====wxLogin========");
  return new Promise(
    (resolve, reject) => {
      wx.login(
        {
          success(res) {
            console.log("====success===", res);
            callback(res)
          },
          fail(res) {
            console.log("====fail===", res);

          }
        }
      )
    }
  )

}






