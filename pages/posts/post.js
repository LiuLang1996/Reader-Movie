const AV = require('./../../utils/av-weapp-min.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    images: [
      {
        imgUrl: "/images/iqiyi.png",
        postId: 5
      },
      {
        imgUrl: "/images/vr.png",
        postId: 4
      },
      {
        imgUrl: "/images/wx.png",
        postId: 3
      }
    ],
    autoplay: true,
    interval: 5000,
    circular: true,
    indicatorDots: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let query = new AV.Query('postList');
    let results = [];
    query.find().then((res) => {
      for (let r of res) {
        results.push(r.attributes);
      }
      this.setData({
        postLists: results
      });
    });
  },

  /**
   * 页面跳转--从文章列表页面跳转到对应的文章详情页面
   */
  toDetail(event) {
    let postId = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: "./post-detail/post-detail?id=" + postId
    });
  }
});
