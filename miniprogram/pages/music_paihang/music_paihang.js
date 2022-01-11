// pages/music_paihang/music_paihang.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    music_bang: null,
  },

  bang: function(e) {
    //  console.log(e)
    wx.navigateTo({
      url: '/pages/paihang_list/paihang_list?id=' + e.currentTarget.dataset.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '排行榜'
    })
    var that = this;
    wx.request({
      url: 'http://m.kugou.com/rank/list&json=true',
      data: '',
      success: function(res) {
     //   console.log(res.data.rank.list)
        var music = res.data.rank.list
        for (var i = 0; i < music.length; i++) {
          var im1 = music[i].imgurl;
          var im2 = im1.replace("/{size}/", "/");
          music[i].imgurl = im2;
        }
      //  console.log(music)
        that.setData({
          music_bang: music
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