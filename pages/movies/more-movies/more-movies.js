// pages/movies/more-movies/more-movies.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pageTitle: options.category
    });
    let dataUrl = '';
    switch (options.category) {
      case '正在热映':
        dataUrl = app.globalData.doubanBaseUrl + '/v2/movie/in_theaters?start=0&count=3'; // 正在热映
        break;
      case '即将上映':
        dataUrl = app.globalData.doubanBaseUrl + '/v2/movie/coming_soon?start=0&count=3'; // 即将上映
        break;
      case 'Top250':
        dataUrl = app.globalData.doubanBaseUrl + '/v2/movie/top250?start=0&count=3'; // Top250
        break;
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let pageTitle = this.data.pageTitle;
    console.log(pageTitle);
    wx.setNavigationBarTitle({
      title: pageTitle,
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})