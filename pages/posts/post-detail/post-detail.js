const AV = require('../../../utils/av-weapp-min.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    let query = new AV.Query('postList');
    query.equalTo('postId', Number.parseInt(options.id));
    query.find().then((res) => {

      // 当用户查看文章详情时，更新文章的阅读次数
      let post = AV.Object.createWithoutData('postList', res[0].id);
      post.set('reading', res[0].attributes.reading + 1);
      post.save();
      /**
       * 初始化信息
       * @param {Number} currentPostId - 文章Id
       * @param {Array} postData - 文章详情数据
       */
      that.setData({
        currentPostId: options.id,
        postData: res[0].attributes
      });
      console.log(this.data.postData);
    });
    /**
     * 从缓存中获取所有文章的收藏数据
     */
    let postsCollected = wx.getStorageSync("postsCollected");
    /**
     * 如果缓存中有数据，则获取该文章是否收藏的信息
     * 如果缓存中没有数据，则初始化缓存信息
     */
    if (postsCollected) {
      let collected = postsCollected[options.id];
      that.setData({
        collected: collected
      });
    } else {
      let postsCollected = {};
      postsCollected[options.id] = false;
      wx.setStorageSync("postsCollected", postsCollected);
    }

    // 当音乐播放完成后回复图片
    wx.onBackgroundAudioStop(function (e) {
      that.setData({
        isPlayingMusic: false
      });
    });
  },

  /**
   * 文章收藏功能
   */
  onColletionTap(event) {
    let postsCollected = wx.getStorageSync("postsCollected");
    postsCollected[this.data.currentPostId] = !postsCollected[
      this.data.currentPostId
    ];
    /**
     * 跟新缓存信息
     */
    wx.setStorageSync("postsCollected", postsCollected);
    this.setData({
      collected: postsCollected[this.data.currentPostId]
    });

    /**
     * 交互反馈 - 当用户收藏或取消收藏给用户提示
     */
    wx.showToast({
      title: postsCollected[this.data.currentPostId] ? "收藏成功" : "取消成功",
      icon: "success",
      duration: 500,
      mask: true
    });
  },

  /**
   * 音乐播放控制
   */
  onMusicTap(event) {
    /**
     * 如果音乐在播放中，暂停音乐播放
     * 如果音乐已经暂停，开始音乐播放
     */
    if (this.data.isPlayingMusic) {
      wx.pauseBackgroundAudio();
      /**
       * 修改音乐播放状态
       */
      this.setData({
        isPlayingMusic: false
      });
    } else {
      console.log(this.data.postData);
      wx.playBackgroundAudio({
        dataUrl: this.data.postData.music.url,
        title: this.data.postData.music.title,
        coverImgUrl: this.data.postData.music.coverImg
      });
      /**
       * 修改音乐播放状态
       */
      this.setData({
        isPlayingMusic: true
      });
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    wx.stopBackgroundAudio();
  },

  /**
   * 分享
   */
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.data.postData.title,
      path: `pages/posts/post-detail/post-detail?id=${this.data.currentPostId}`,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
});
