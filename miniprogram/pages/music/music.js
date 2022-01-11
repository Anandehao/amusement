// pages/music/music.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    music_sousuo: null,
    tt: 1,
    lunb_list: null,
    music_list: null
  },
  play: function (e) {
  //  console.log(e)
    const hash= e.currentTarget.dataset.hash
    const id= e.currentTarget.dataset.index
    const that = this
    const list = this.data.music_list
    wx.cloud.init()
    const db = wx.cloud.database()
    const _ = db.command
    db.collection("music_playlist").where({
      hash: _.exists(true)
    }).remove({
      success: result => {
          // console.log(result,"nan")
      }
    })
    for (let i = 0; i < list.length; i++) {
      db.collection("music_playlist").add({
        data: {
          hash: list[i].hash,
          hashId: i
        },
        success: resule => {
         //   console.log(resule)
        }
      })
    }

    wx.navigateTo({
      url: '/pages/music_play/music_play?hash=' + hash + '&&id='+id,
    })
  },

  like: function () {
    wx.navigateTo({
      url: '/pages/music_like/music_like',
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },

  geshou: function () {
    wx.navigateTo({
      url: '/pages/music_geshou/music_geshou',
    })
  },
  paihang: function () {
    wx.navigateTo({
      url: '/pages/music_paihang/music_paihang',
    })
  },

  gedan: function () {
    wx.navigateTo({
      url: '/pages/music_gedan/music_gedan',
    })
  },

  tt: function () {
    var that = this;
    that.setData({
      tt: 1
    })
  },
  tt2: function () {
    var that = this;
    that.setData({
      tt: 0
    })
  },

  st: function (e) {
    var that = this;
    //  console.log(e.currentTarget.dataset.name)
    wx.navigateTo({
      url: '/pages/sousuo/sousuo?danqu=' + e.currentTarget.dataset.name,
    })
    that.setData({
      tt: 0
    })
  },

  sousuo: function (e) {
    var that = this;
    //  console.log(e)
    wx.request({
      url: 'http://mobilecdn.kugou.com/api/v3/search/song?format=json&page=1&pagesize=20&showtype=1',
      data: {
        keyword: e.detail.value
      },
      success: function (res) {
        //   console.log(res.data.data.info)
        that.setData({
          music_sousuo: res.data.data.info,
        })
        //     console.log(that.data.music_sousuo);
      },
      fail: function (res) {},
      complete: function (res) {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '阿楠音乐'
    })
    var that = this;
    // 推荐
    wx.request({
      url: 'http://m.kugou.com/?json=true',
      data: '',
      success: function (res) {
        //  console.log(res.data.data)
        that.setData({
          lunb_list: res.data.banner,
          music_list: res.data.data
        })
      },
      fail: function (res) {},
      complete: function (res) {},
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})