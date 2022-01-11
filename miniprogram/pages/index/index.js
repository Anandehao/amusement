let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //添加到数据库
  addData(name, url) {
    wx.cloud.init()
    const db = wx.cloud.database()
    db.collection("userInfo").where({
      nickName:name
    }).get({
      success(res){
      //  console.log(res.data.length)
        if(res.data.length==0){
          db.collection("userInfo").add({
            data: {
              nickName: name,
              avatarUrl: url
            },
            success(res) {
            //  console.log(res)
            }
          })
        }
      }
    })


    
  },
  tz(){
    const that = this
    wx.getUserProfile({
      desc: '获取头像，昵称',
      success(res) {
        //  console.log(res)
        const name=res.userInfo.nickName
        const url=res.userInfo.avatarUrl
        app.nickName = name,
        app.avatarUrl = url
        that.addData(name,url)
        wx.switchTab({
          url: '/pages/music/music',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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