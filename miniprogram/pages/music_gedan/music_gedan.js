// pages/music_gedan/music_gedan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    music_gedan: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '歌单推荐'
    })
    var that = this;
    wx.request({
      url: 'http://m.kugou.com/plist/index&json=true',
      data: '',
      success: function(res) {
      //  console.log(res.data)
        var music_newgedan = res.data.plist.list.info
        for (var i = 0; i < music_newgedan.length; i++) {
          var im1 = music_newgedan[i].imgurl
          var im2 = music_newgedan[i].user_avatar
          var im3 = im1.replace('/{size}/', '/');
          var im4 = im1.replace('/{size}/', '/');
          music_newgedan[i].imgurl = im3
          music_newgedan[i].imgurl = im4
        }
        that.setData({
          music_gedan: music_newgedan
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