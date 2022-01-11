// pages/read_boy/read_boy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender:[],
    majorList:[],
    majorListIndex:0,
    majorListItems:[]
  },
  async fun(e){
    const res = await this.getMajor(e)
      //console.log(res)
    const major=res[0].name
    const resu = await this.getBookList(e,major)
  //  console.log(resu)
  },
  //内容
  content:function(param){
  //  console.log(param)
    const id=param.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/read_content/read_content?id='+id,
    })
  },
  //获取分类
    getMajor:function(e) {
      var that=this
    //  console.log(e)
    return new Promise((resolve,reject)=>{
      wx.request({
        url: 'http://api.zhuishushenqi.com/cats/lv2/statistics',
        success: (result) => {
        //分类
        //  console.log(result.data[`${e}`],"aa")
          resolve(result.data[`${e}`])
          that.setData({
            majorList:result.data[`${e}`],
          })
        },
        fail: (res) => {
        },
        complete: (res) => {},
      })
    })
   
  },
  //获取分类内容
  getBookList:function(e,major){
    const that=this
    const gender=e
    return new Promise((resolve,reject)=>{
      wx.request({
        url: 'https://api.zhuishushenqi.com/book/by-categories?type=hot&minor=&start=0&limit=20',
        data: {
          gender:gender,
          major:major
        },
        success: (result) => {
        //  console.log(result)
        let list=result.data.books;
        for(let i=0;i<list.length;i++){
          let img=unescape(list[i].cover).slice(7);
          list[i].cover=img;
        }
          resolve(list)
          that.setData({
            majorListItems:list
          })
        },
        fail: (res) => {},
        complete: (res) => {},
      })
    })
    
  },
  //分类列表选择
  opt:function(e) {
    const that=this
  //  console.log(e)
  //  console.log(e.currentTarget.dataset.index)
    const index=e.currentTarget.dataset.index
    const name=e.currentTarget.dataset.name
  // console.log(name)
  //  console.log(this.data.gender)
    const gender=this.data.gender
    that.getBookList(gender,name)
    that.setData({
      majorListIndex:index,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 标题
    wx.setNavigationBarTitle({
      title: options.sex
    })
    this.setData({
      gender:options.gender
    })
    //console.log(options)
    this.fun(options.gender)
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