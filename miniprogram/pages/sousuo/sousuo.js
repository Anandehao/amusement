// pages/sousuo/sousuo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: null,
    music_list: null, //黄色
    music_sousuo: null,
    tt: 1 //灰色
  },
  tt: function() {
    var that = this;
    that.setData({
      tt: 1
    })
  },


  danqu: function(e) { //灰色的点击事件
    var that = this;
    //   console.log(e)
    that.setData({
      name: e.currentTarget.dataset.name
    })
    wx.request({
      url: 'http://mobilecdn.kugou.com/api/v3/search/song?format=json&page=1&pagesize=20&showtype=1',
      data: {
        keyword: e.currentTarget.dataset.name
      },
      success: function(res) {
        //    console.log(res)
        that.setData({
          music_list: res.data.data.info,
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    that.setData({
      tt: 0
    })
  },

  sousuo: function(e) { //input框的input事件
    var that = this;
    //   console.log(e)
    wx.request({
      url: 'http://mobilecdn.kugou.com/api/v3/search/song?format=json&page=1&pagesize=20&showtype=1', // 根据名查询得到数组
      data: {
        keyword: e.detail.value
      },
      success: function(res) {
        //    console.log(res.data.data.info)
        that.setData({
          music_sousuo: res.data.data.info, //灰色的数组
        })
        //  console.log(that.data.music_sousuo);
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //  console.log(options)
    that.setData({
      name: options.danqu
    })
    wx.request({
      url: 'http://mobilecdn.kugou.com/api/v3/search/song?format=json&page=1&pagesize=20&showtype=1',
      data: {
        keyword: that.data.name
      },
      success: function(res) {
        //    console.log(res.data.data.info)
        that.setData({
          music_list: res.data.data.info //开始的黄色数组
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})