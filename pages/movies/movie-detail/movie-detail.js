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
        movie: movie
      });
    });
  },

  /**
   * http方法的回調函數
   */
  processDoubanData(data) {
    console.log(data);
  }
});
