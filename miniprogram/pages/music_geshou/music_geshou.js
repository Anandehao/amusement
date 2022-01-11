// pages/music_geshou/music_geshou.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    music_geshou: null,
    geshou_list: null,
    name: null,
    tt1:1,
    tt:0
  },

  gs:function(e){
  // console.log(e)
   wx.navigateTo({
     url: '/pages/geshou_list/geshou_list?id=' + e.currentTarget.dataset.singerid,
   })
  },

  xia:function(){
    var that=this;
    that.setData({
      tt1:0,
      tt:1
    })
  },
  shang: function () {
    var that = this;
    that.setData({
      tt1: 1,
      tt: 0
    })
  },

  geshou: function(e) {
    var that = this;
    //    console.log(e)
    wx.request({
      url: 'http://m.kugou.com/singer/list/?json=true',
      data: {
        classid: e.currentTarget.dataset.classid
      },
      success: function(res) {
       // console.log(res.data)
        var music = res.data.singers.list.info;
        for (var i = 0; i < music.length; i++) {
          var im1 = music[i].imgurl;
          var im2 = im1.replace("/{size}/", "/")
          music[i].imgurl = im2
        }
      //  console.log(music)
        that.setData({
          geshou_list: music,
          name: res.data.classname
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '热门歌手'
    })
    var that = this;
    wx.request({
      url: 'http://m.kugou.com/singer/class&json=true',
      data: '',
      success: function(res) {
       // console.log(res)
        wx.request({
          url: 'http://m.kugou.com/singer/list/?json=true',
          data: {
            classid: 88
          },
          success: function(res) {
        //    console.log(res.data)
            var music = res.data.singers.list.info;
            for (var i = 0; i < music.length; i++) {
              var im1 = music[i].imgurl;
              var im2 = im1.replace("/{size}/", "/")
              music[i].imgurl = im2
            }
         //   console.log(music)
            that.setData({
              geshou_list: music,
              name: res.data.classname
            })
          },
          fail: function(res) {},
          complete: function(res) {},
        })
        that.setData({
          music_geshou: res.data.list
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