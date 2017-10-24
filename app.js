App({
  globalData: {
    doubanBaseUrl: 'https://api.douban.com'
  },

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {

  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  }
})

// 全局初始化Bmob后端云
let Bmob = require('utils/bmob.js');
Bmob.initialize("87add8d890b4dfd94c4cd4579b15fe9f", "f62a0c6c6b04cb56560d671eaf98a821");