// pages/read_bookshelf/read_bookshelf.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    booksList: null,
    booksNum: 0
  },

  // 阅读
  read(res) {
  //  console.log(res)
    const id = res.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/read_content/read_content?id=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "书架"
    })
    wx.cloud.init()
    this.selectBook()
  },

  // 查询书架书籍
  selectBook() {
    const that = this
    const db = wx.cloud.database()
    db.collection("bookshelf").get({
      success(res) {
     //   console.log(res)
        that.setData({
          booksList: res.data.reverse(),
          booksNum: res.data.length
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