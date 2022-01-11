// pages/music_like/music_like.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: null,
    name: null,
    image: null,
    navLeft: 1,
    navRight: 0,
    options: 1,
    songList: null,
    nickName: null,
    AvatarUrl: null
  },

  // 歌曲、歌单选项
  async likeNav(params) {
    const that = this
    // console.log(params.currentTarget.dataset)
    const rightId = params.currentTarget.dataset.rightid
    const leftId = params.currentTarget.dataset.leftid
    if (rightId == 0) {
      if (that.data.songList == null) {
        const list = await that.selectSongList()
        //  console.log(list.data)
        that.setData({
          navLeft: 0,
          nacRight: 1,
          songList: list.data,
          options: 0
        })
      } else {
        that.setData({
          navLeft: 0,
          nacRight: 1,
          options: 0
        })
      }


    } else if (leftId == 0) {
      that.setData({
        navLeft: 1,
        navRight: 0,
        options: 1
      })
    }
  },
  // 查询歌单列表
  selectSongList: function (e) {
    const that = this
    return new Promise((resolve, reject) => {
      const db = wx.cloud.database()
      db.collection("music_songlist").get({
        success: result => {
          //  console.log(result)
          resolve(result)
        }
      })
    })

  },
  // 删除歌单
  deleteSongList(params) {
    const that = this
    //  console.log(params.currentTarget.dataset.id)
    const id = params.currentTarget.dataset.id
    const db = wx.cloud.database()
    db.collection("music_songlist").doc(id).remove({
      success: result => {
        //  console.log(result)
        that.onLoad()
      },
    })
  },

  // 删除歌曲
  sc: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.hash)
    var db = wx.cloud.database();
    db.collection("music_list").doc(e.currentTarget.dataset.hash).remove({
      success: function (res) {
        //  console.log(res)
        that.onLoad();
      },
    })
  },

  play: function (e) {
    // console.log(e)
    const hash = e.currentTarget.dataset.hash
    const id = e.currentTarget.dataset.id
    const that = this
    const list = this.data.list
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
    wx.setNavigationBarTitle({
      title: '喜欢'
    })
    this.setData({
      nickName: app.nickName,
      AvatarUrl: app.avatarUrl
    })
    var that = this;
    wx.getUserInfo({
      withCredentials: false,
      success: function (e) {
        // console.log(e)
        that.setData({
          name: e.userInfo.nickName,
          image: e.userInfo.avatarUrl
        })
      },
    })
    wx.cloud.init();
    var db = wx.cloud.database();
    db.collection("music_list").get({
      success: function (res) {
        //console.log(res);
        var list = res.data;
        that.setData({
          list: list.reverse()
        })
      }
    })
    this.fun()
  },
  async fun(params) {
    const songList = await this.selectSongList()
    //  console.log(songList)
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