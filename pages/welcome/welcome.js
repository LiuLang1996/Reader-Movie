Page({
  /**
   * 载入页面时
   */
  onLoad() {
    let that = this;
    wx.login({
      success(res) {
        if (res.code) {
          wx.getUserInfo({
            success: function(res) {
              that.setData({
                userInfo: res.userInfo
              });
            }
          });
        }
      },
      fail(res) {
        console.log("登录失败");
      }
    });
  },

  /**
   * 重定向路由
   */
  onTap() {
    // wx.redirectTo({
    //   url: '/pages/posts/post',
    // })
    wx.switchTab({
      url: "/pages/posts/post"
    });
  }
});