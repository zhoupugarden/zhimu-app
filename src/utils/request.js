/**
 * 封封微信的的request
 */
export function request(url, method = "GET", data) {
  console.log('url', url, 'method', method, 'data', data);
  let token = '';
  if (wx.getStorageSync('vuex')) {
    token =  JSON.parse(wx.getStorageSync('vuex')).token;
  }

  return new Promise(function (resolve, reject) {
    wx.showLoading({
      title: '加载中',
      mask:true
    });

    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      success: function (res) {
        console.log('请求结果', res);
        if (res.data.code === 200) {
          if (!res.data.data) {
            resolve('空的data');
            return;
          }
          resolve(res.data.data)
        } else if (res.data.code === 401) {
          wx.navigateTo(
            {
              url:'/pages/login/main'
            }
          )

        } else if (res.data.code === 500) {
          wx.showModal({
            title: '提示',
            content: res.data.message,
            showCancel: false
          });
          reject(res.data);
        } else {
          wx.showModal({
            title: '提示',
            content: "休息一下，等会再来",
            showCancel: false
          });
          reject(res.data);
        }

      },
      fail: function (err) {
        wx.showModal({
          title: '错误',
          content: '网络异常',
          showCancel: false
        });
        reject(err);
      },
      complete(res) {
        wx.hideLoading();
      }
    })
  });
}
