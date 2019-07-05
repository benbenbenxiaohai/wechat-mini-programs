// pages/history/history.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var gameArr = wx.getStorageSync('gameArr') || [];
    var items = [];
    for (var i = 0; i < gameArr.length; i++) {
      var game = gameArr[i];
      var roundArr = game.roundArr;
      var sum0 = 0,
        sum1 = 0,
        sum2 = 0,
        sum3 = 0;
      for (var j = 0; j < roundArr.length; j++) {
        sum0 += roundArr[j].scoreArr[0];
        sum1 += roundArr[j].scoreArr[1];
        sum2 += roundArr[j].scoreArr[2];
        sum3 += roundArr[j].scoreArr[3];
      }

      var item = {};
      item.playerNameArr = game.playerNameArr;
      item.sumArr = [sum0, sum1, sum2, sum3];
      item.created = game.created;

      items.push(item);
    }
    this.setData({
      items: items
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  continueScore: function(e) {
    console.log("DEBUG: Continue score on game[" + e.target.id + "]");
    app.globalData.currentGameIdx = e.target.id;
    wx.navigateTo({
      url: '../scores/scores',
    })
  }
})