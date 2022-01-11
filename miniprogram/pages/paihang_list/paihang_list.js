// pages/bang_list/bang_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    music_list: null,
    im3: null
  },


  play: function (e) {
   // console.log(e)
    const hash = e.currentTarget.dataset.hash
    const id = e.currentTarget.dataset.id
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
          url: '/pages/music_play/music_play?hash=' + hash + '&&id=' + id,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //  console.log(options)
    wx.request({
      url: 'http://m.kugou.com/rank/info/?page=1&json=true',
      data: {
        rankid: options.id
      },
      success: function (res) {
        //   console.log(res.data.info)
        var im1 = res.data.info.bannerurl;
        var im3 = im1.replace("/{size}/", "/");
        //     console.log(res.data.songs.list)
        var music = res.data.songs.list;
        for (var i = 0; i < music.length; i++) {
          var tx1 = music[i].filename;
          var list = tx1.split(" - ")
          music[i].name = list[0];
          music[i].music = list[1]
        }
        that.setData({
          music_list: music,
          im3: im3
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