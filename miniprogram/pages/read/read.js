// pages/read/read.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tt:0,
    books_cs:null,
    img:null,
    rm_books:[],
    qt_books:[]
  },
  tt:function(e){
    this.setData({
      tt:1
    })
  },
 
  // 搜索
  sousuo:function(e){
    var that=this;
    //console.log(e.detail.value);
    wx.request({
      url: 'http://api.zhuishushenqi.com/book/fuzzy-search',
      data: {
        query:e.detail.value
      },
      success: (result) => {
       // console.log(result.data.books);  
        that.setData({
          books_cs:result.data.books,
          tt:1
        })
      },
    })
  },
  // 搜索选择
  st:function(params) {
    const that=this
  //  console.log(params)
    const id=params.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/read_content/read_content?id='+id,
      success:()=>{
        that.setData({
          tt:0
        })
      }
    })
  },
  // 排行
  paihang:function(){
    wx.navigateTo({
      url: '/pages/read_paihang/read_paihang',
    })
   
  },
  // 书架
  press:function(){
    wx.navigateTo({
      url: '/pages/read_bookshelf/read_bookshelf'
    })
  },
  // 男生
  nansheng:function(){
    wx.navigateTo({
      url: '/pages/read_gender/read_gender?gender=male&sex='+'男生',
    })
  },
  //女生
  nvsheng:function(){
    wx.navigateTo({
      url: '/pages/read_gender/read_gender?gender=female&sex='+'女生',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '阿楠阅读'
    })
    var that=this;
    let arr=that.data.rm_books;
    let arr2=that.data.qt_books;
    wx.request({
      url: 'http://api.zhuishushenqi.com/ranking/54d43437d47d13ff21cad58b',
      success: (result) => {
        //console.log(result.data)
         //取前八个
        for(let i=0;i<8;i++){
          let imag=(unescape(result.data.ranking.books[i].cover)).slice(7);
          arr.push(result.data.ranking.books[i]);
          arr[i].cover=imag;
       //   console.log(arr);
        }
        //剩下的其他推荐
        let t=0;
        for(let j=8;j<result.data.ranking.books.length;j++){
          
          let imag2=(unescape(result.data.ranking.books[j].cover)).slice(7);
       //  console.log(imag2,"正确图片");
       //  console.log(result.data.ranking.books[j])
          arr2.push(result.data.ranking.books[j]);
          arr2[t].cover=imag2;
        //  console.log(arr2[t],"重新赋值")
          ++t;
        //  console.log(arr2,"最终数组");
        }
        that.setData({
          rm_books:arr,
          qt_books:arr2
        })
       
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  },
  read:function(e){
  //  console.log(e.currentTarget.dataset.id);
    const id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/read_content/read_content?id='+id,
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