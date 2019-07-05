// pages/summary/summary.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    roundArr: [],
    playerName1: '',
    playerName2: '',
    playerName3: '',
    playerName4: '',
    sum1: '',
    sum2: '',
    sum3: '',
    sum4: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var game = wx.getStorageSync('gameArr')[app.globalData.currentGameIdx];
    //set player names
    this.setData({
      playerName1: game.playerNameArr[0],
      playerName2: game.playerNameArr[1],
      playerName3: game.playerNameArr[2],
      playerName4: game.playerNameArr[3]
    });

    var roundArr = game.roundArr;
    this.setData({
      roundArr: roundArr
    })

    var sum = [0, 0, 0, 0];
    for (var i = 0; i < roundArr.length; i++) {
      sum[0] += roundArr[i].scoreArr[0];
      sum[1] += roundArr[i].scoreArr[1];
      sum[2] += roundArr[i].scoreArr[2];
      sum[3] += roundArr[i].scoreArr[3];
    }
    this.setData({
      sum1: sum[0],
      sum2: sum[1],
      sum3: sum[2],
      sum4: sum[3]
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