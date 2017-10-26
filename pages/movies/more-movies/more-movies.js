// pages/movies/more-movies/more-movies.js
import { convertToStarsArray, http } from '../../../utils/utils.js';

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalCount: 0,
    isEmpty: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let dataUrl = '';
    this.setData({
      pageTitle: options.category
    });
    switch (options.category) {
      case '正在热映':
        dataUrl = app.globalData.doubanBaseUrl + '/v2/movie/in_theaters'; // 正在热映
        break;
      case '即将上映':
        dataUrl = app.globalData.doubanBaseUrl + '/v2/movie/coming_soon'; // 即将上映
        break;
      case 'Top250':
        dataUrl = app.globalData.doubanBaseUrl + '/v2/movie/top250'; // Top250
        break;
    }

    http(dataUrl, this.processDoubanData);
    this.setData({
      nextUrl: dataUrl
    });
  },


  processDoubanData: function (moviesDouban) {
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
    let totalMovies = {};
    if (this.data.isEmpty) {
      totalMovies = movies;
      this.data.isEmpty = false;
    } else {
      totalMovies = this.data.movies.concat(movies);
    }
    // 推送数据
    this.setData({
      movies: totalMovies
    });
    wx.hideLoading();
    wx.stopPullDownRefresh();
    this.data.totalCount += 20;
  },
  
  onScrollLower: function (event) {
    let nextUrl = `${this.data.nextUrl}?start=${this.data.totalCount}&count=20`;
    http(nextUrl, this.processDoubanData);
    wx.showLoading({
      title: '正在加载...'
    })
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
    // 重新加载前20条数据的地址
    let refreshUrl = `${this.data.nextUrl}?start=0&count=20`;
    // 清空页面的电影数据和状态
    this.data.movies = {};
    this.data.isEmpty = false;
    http(refreshUrl, this.processDoubanData);
    wx.startPullDownRefresh()
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