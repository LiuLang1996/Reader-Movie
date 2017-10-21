import { postList } from '../../data/posts-data.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/images/iqiyi.png',
      '/images/vr.png',
      '/images/wx.png'
    ],
    autoplay: true,
    interval: 5000,
    circular: true,
    indicatorDots: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      postLists: postList
    })

  },
  /**
   * 页面跳转--从文章列表页面跳转到对应的文章详情页面
   */
  toDetail: function (event) {
    let postId = event.currentTarget.dataset.postId;
    console.log(postId);
    wx.navigateTo({
      url: './post-detail/post-detail?id=' + postId,
    })
  }
})