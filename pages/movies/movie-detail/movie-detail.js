import { Movie } from "class/Movie.js";

const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let id = options.id;
    let detailUrl = `${app.globalData.doubanBaseUrl}/v2/movie/subject/${id}`;
    let movie = new Movie(detailUrl);
    movie.getMovieData(movie => {
      this.setData({
        movie: movie,
        id: id
      });
    });
  },

  /**
   * http方法的回調函數
   */
  processDoubanData(data) {
    console.log(data);
  },

  /**
   * 页面分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.data.movie.title,
      path: `pages/movies/movie-detail/movie-detail?id=${this.data.id}`,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
});
