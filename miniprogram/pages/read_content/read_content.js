// pages/read_content/read_content.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: null,
    pick: 1,
    id: null
  },

  // 添加书架
  addBook() {
    const that = this
    //  console.log("ss")
    const db = wx.cloud.database()
    db.collection("bookshelf").add({
      data: {
        bookId: that.data.id,
        cover: that.data.book.cover,
        name: that.data.book.title
      },
      success(res) {
        //  console.log(res)
        that.setData({
          pick: 0
        })
      },
    })
  },
  //取消收藏 
  cancelBook() {
    const that = this
    const db = wx.cloud.database()
    db.collection("bookshelf").where({
      bookId: that.data.id
    }).get({
      success(res) {
        //  console.log(res.data[0])
        const id = res.data[0]._id
        db.collection("bookshelf").doc(id).remove({
          success(e) {
            //  console.log(e)
            that.setData({
              pick: 1
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  console.log(options)
    wx.cloud.init()
    this.content(options.id)
    this.selectBook(options.id)
    this.setData({
      id: options.id
    })
  },

  // 查询书籍详细信息
  content: function (e) {
    const that = this
    wx.request({
      url: 'http://api.zhuishushenqi.com/book/' + e,
      success: (result) => {
        //  console.log(result.data)
        let book = result.data
        let img = unescape(book.cover).slice(7)
        book.cover = img;
        // 标题
        wx.setNavigationBarTitle({
          title: book.title
        })
        that.setData({
          book: book,
        })
      }
    })
  },

  // 查询是否收藏
  selectBook(id) {
    const that = this
    const db = wx.cloud.database()
    db.collection("bookshelf").where({
      bookId: id
    }).get({
      success(res) {
        //  console.log(res)
        if (res.data.length == 1) {
          that.setData({
            pick: 0
          })
        }
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