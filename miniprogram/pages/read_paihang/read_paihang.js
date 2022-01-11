// pages/read_paihang/read_paihang.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleList:null,
    titleID:0,
    booksList:null
  },
  //内容
  content:function(params) {
  //  console.log(params)
    const id=params.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/read_content/read_content?id='+id,
    })
  },
  // 排行榜选择
  opt:function(e){
    var that=this;
  //  console.log(e.currentTarget.dataset.name);
    wx.request({
      url: 'http://api.zhuishushenqi.com/ranking/'+e.currentTarget.dataset.name,
      success: (result) => {
      //  console.log(result)
        let list=result.data.ranking.books;
        for(let i=0;i<list.length;i++){
          let img=unescape(list[i].cover).slice(7);
          list[i].cover=img;
        }
        that.setData({
          booksList:list,
      titleID:e.currentTarget.dataset.index

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
    wx.setNavigationBarTitle({
      title: '排行'
    })
    var that=this;
    // 排行榜
    wx.request({
      url: 'http://api.zhuishushenqi.com/ranking/gender',
      success: (result) => {
      //  console.log(result.data);
        that.setData({
          titleList:result.data.picture
        })
      },
      fail: (res) => {},
      complete: (res) => {},
    })
    // 排行榜内容

    wx.request({
      url: 'http://api.zhuishushenqi.com/ranking/'+'5a322ef4fc84c2b8efaa8335',
      success: (result) => {
      //  console.log(result.data.ranking.books);
        let list=result.data.ranking.books;
        for(let i=0;i<list.length;i++){
          let img=unescape(list[i].cover).slice(7);
          list[i].cover=img;
        }
        that.setData({
          booksList:list
        })
      },
      fail: (res) => {},
      complete: (res) => {},
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