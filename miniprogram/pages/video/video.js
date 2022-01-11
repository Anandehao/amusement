// pages/video/video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Video: null,
    Image: null,
    tt2: 1,
    tt1: 0,
    t_item: 1,
    v_num: 0,
    v_list: ['网红', '明星', '热舞', '风景', '游戏', '动物'],
    Fxplay: null,
    videoId: 0
  },
  

  //发现
  fx: function () {
    if (this.data.tt1 == 1) {
      this.setData({
        t_item: 1
      })
    } else {
      this.setData({
        t_time: 1,
        tt1: 1,
        tt2: 0,
        tt3: 0
      })
      //  console.log(this.data.v_list[this.data.v_num])
      wx.request({
        url: 'https://api.iyk0.com/dsp',
        data: {
          type: this.data.v_list[this.data.v_num]
        },
        success: (result) => {
          //  console.log(result.data);
          this.setData({
            Fxplay: result.data.url,
            t_item: 1
          })
        },
        fail: (res) => {},
        complete: (res) => {},
      })
    }
  },
  //发现视频播放结束
  Fxended: function (e) {
    wx.request({
      url: 'https://api.iyk0.com/dsp',
      data: {
        type: this.data.v_list[this.data.v_num]
      },
      success: (result) => {
        //  console.log(result.data);
        this.setData({
          Fxplay: result.data.url
        })
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  },
  //精选
  jx: function () {
    this.setData({
      tt2: 1,
      tt1: 0,
    })

  },
  //精选视频播放结束
  Jxended: function () {
    const that = this
    wx.request({
      url: 'https://api.iyk0.com/weishi',
      success: (result) => {
        //  console.log(result.data.img);
        that.addVideo(result.data.link)
        that.setData({
          Video: result.data.link
        })
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  },

  //类型选择
  cate: function (e) {
    //  console.log(e.currentTarget.dataset.name);
    this.setData({
      v_num: e.currentTarget.dataset.name
    })
    wx.request({
      url: 'https://api.iyk0.com/dsp',
      data: {
        type: this.data.v_list[this.data.v_num]
      },
      success: (result) => {
        //   console.log(result.data);
        this.setData({
          Fxplay: result.data.url,
          t_item: 0
        })
      },
      fail: (res) => {},
      complete: (res) => {},
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.cloud.init()
    //精选
    wx.request({
      url: 'https://api.iyk0.com/weishi',
      success: (result) => {
        //  console.log(result.data.img);
        that.addVideo(result.data.link)
        that.setData({
          Video: result.data.link,
          Image: result.data.img
        })
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  },
  // 播放记录存入数据库
  addVideo(params) {
    //  console.log(params)
    const that = this
    let db = wx.cloud.database()
    db.collection("video_list").get({
      success(result) {
        //    console.log(result)
        let videoId = result.data.length
        db.collection("video_list").add({
          data: {
            videoId: videoId,
            videoUrl: params
          },
          success(res) {
            //    console.log(res)
            let id = videoId - 1
            that.setData({
              videoId: id
            })
          }
        })
      }
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
  onShow: function () {},

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
    const that = this
    console.log(that.data.videoId)
    const db = wx.cloud.database()
    db.collection("video_list").where({
      videoId: that.data.videoId
    }).get({
      success(res) {
        //  console.log(res.data.length)
        if (res.data.length) {
          that.setData({
            videoId: res.data[0].videoId - 1,
            Video: res.data[0].videoUrl
          })
        } else {
          const _ = db.command
          db.collection("video_list").where({
            videoUrl: _.exists(true)
          }).remove({
            success(e) {
              //  console.log(e)
              that.onLoad()
            }
          })
        }

      },
      complete() {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      }
    })

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