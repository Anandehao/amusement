// pages/gedan_list/gedan_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    music_list: null,
    imgurl: null,
    image: null,
    name: null,
    username: null,
    imgSrc: null,
    specialid: null,
    music: null
  },
  play: function (e) {
    //  console.log(e,"gedanlist")
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
  async fun(e) {
    const selectList = await this.selectSongList()
    //  console.log(selectList[0]._id, 'zhang')
    if (selectList.length) {
      this.setData({
        imgSrc: "/images/hongxin.png"
      })
    } else {
      this.setData({
        imgSrc: "/images/xin.png"
      })
    }

  },
  // 查询喜欢
  selectSongList: function (params) {
    const that = this
    return new Promise((resolve, reject) => {
      const db = wx.cloud.database()
      db.collection("music_songlist").where({
        specialid: that.data.specialid
      }).get({
        success: result => {
          //  console.log(result, "nan")
          resolve(result.data)
        }
      })
    })

  },
  // 添加喜欢
  addSongList: function (params) {
    const that = this
    return new Promise((resolve, reject) => {
      const db = wx.cloud.database()
      db.collection('music_songlist').add({
        data: {
          name: that.data.name,
          imgurl: that.data.imgurl,
          username: that.data.username,
          image: that.data.image,
          specialid: that.data.specialid,
          music: that.data.music
        },
        success: (result) => {
          console.log(result, 'nan')
          wx.showToast({
            title: '收藏成功',
            icon: 'none',
            duration: 1500,
          })
          resolve(result)
        }
      })
    })

  },
  // 取消喜欢
  removeSongList: function (params) {
    //  console.log(params,'nan')
    const that = this
    return new Promise((resolve, reject) => {
      const db = wx.cloud.database()
      db.collection("music_songlist").doc(params).remove({
        success: (result) => {
          //  console.log(result)
          wx.showToast({
            title: '取消收藏',
            icon: 'none',
            duration: 1500,
          })
          resolve(resilt)
        },
        fail: (result) => {
          console.log(result)
        }
      })
    })

  },

  async songLike(params) {
    const that = this
    //  console.log(params.currentTarget.dataset)
    const img = params.currentTarget.dataset.src
    const imga = "/images/hongxin.png"
    const imgb = "/images/xin.png"
    const imgSrc = (img == imgb ? imga : imgb)
    //  console.log(imgSrc)
    this.setData({
      imgSrc: imgSrc
    })
    if (img == imgb) {
      const add = await that.addSongList()
    } else {
      const selectId = await that.selectSongList()
      //  console.log(selectId[0]._id)
      const songlistId = selectId[0]._id
      const rem = await that.removeSongList(songlistId)
      //  console.log(rem)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log("胡66 - 群居动物".split("-"));
    var that = this;
    //  console.log(options)
    that.setData({
      imgurl: options.imgurl,
      image: options.image,
      name: options.name,
      username: options.username,
      specialid: options.specialid,
      music: options.music
    })
    wx.cloud.init()
    wx.request({
      url: 'http://m.kugou.com/plist/list?json=true',
      data: {
        specialid: options.music
      },
      success: function (res) {
        //    console.log(res.data.list.list.info)
        var music = res.data.list.list.info
        for (var i = 0; i < music.length; i++) {
          var tex1 = music[i].filename;

          var list = tex1.split(" - ");
          music[i].name = list[0];
          music[i].music = list[1]
          //  console.log(list);
          //   console.log(list[0]);
          //   console.log(list[1]);
        }
        that.setData({
          music_list: music
        })
      },
      fail: function (res) {},
      complete: function (res) {},
    })
    this.fun()

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