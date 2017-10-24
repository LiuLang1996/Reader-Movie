// pages/movies/movies.js
import { convertToStarsArray, http } from '../../utils/utils.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const inTheatersUrl = app.globalData.doubanBaseUrl + '/v2/movie/in_theaters?start=0&count=3'; // 正在热映
    const comingSoonUrl = app.globalData.doubanBaseUrl + '/v2/movie/coming_soon?start=0&count=3'; // 即将上映
    const top250Url = app.globalData.doubanBaseUrl + '/v2/movie/top250?start=0&count=3'; // Top250

    this.getMovieListData(inTheatersUrl, 'inTheaters', '正在热映');
    this.getMovieListData(comingSoonUrl, 'comingSoon', '即将上映');
    this.getMovieListData(top250Url, 'top250', 'Top250');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },

  /**
   * 获取电影列表数据
   * @params {String} url - 数据的url地址
   */
  getMovieListData: function (url, settedKey, categoryTitle) {
    let that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'Content-Type': 'application/jaon;charset=utf-8'
      },
      success: function (res) {
        that.processDoubanData(res.data, settedKey, categoryTitle);
      }
    })
  },

  processDoubanData: function (moviesDouban, settedKey, categoryTitle) {
    let movies = [];
    for (let idx in moviesDouban.subjects) {
      let subject = moviesDouban.subjects[idx];
      let title = subject.title;
      // 如果电影的名字超过六个字符，则只显示六个字符，其余的字符以省略号表示
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      // [1,1,1,1,1] [1,1,1,0,0]
      var temp = {
        stars: convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    let readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    };
    // 推送数据
    this.setData(readyData);
  },

  /**
   * 查看更多电影
   */
  onMoreTap: function (event) {
    const category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movies/more-movies?category=' + category,
    })
  }
})