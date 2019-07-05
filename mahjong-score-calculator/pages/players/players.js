/**
 * 以game为单位
 */
var util = require('../../utils/util.js');
const app = getApp();

Page({
  data: {
    error: '',
    playerId1: '1',
    playerId2: '2',
    playerId3: '3',
    playerId4: '4',
    playerNameArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    this.data.currentRoundIdx = '100';
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

  playerInput: function(e) {
    var playerId = e.target.id;
    var playerName = e.detail.value;
    console.log("DEBUG: Input: player '" + playerId + "' with name '" + playerName + "'");
    this.data.playerNameArr[playerId - 1] = playerName;
  },

  toScores: function() {
    if (this._validatePlayerNames()) {
      //a game consists of players and rounds
      var game = {};
      game.playerNameArr = this.data.playerNameArr;
      game.roundArr = []; //a round consists of score arrays
      game.created = util.formatTime(new Date());

      var gameArr = wx.getStorageSync('gameArr') || [];
      gameArr.push(game);
      wx.setStorageSync('gameArr', gameArr);
      app.globalData.currentGameIdx = gameArr.length - 1;

      wx.navigateTo({
        url: '../scores/scores',
      })
    }
  },

  _validatePlayerNames: function() {
    var error = '';
    var playerNameArr = this.data.playerNameArr;
    console.log("DEBUG: Validating player array '" + playerNameArr + "'");
    for (var i = 0; i < 4; i++) {
      var playerName = playerNameArr[i];
      if (playerName == null || playerName == '') {
        error += "玩家" + (i + 1) + "的姓名不能为空 \n";
      } else if (playerName.length > 4) {
        error += "玩家" + (i + 1) + "的姓名长度不能超过4 \n"
      }
    }
    this.setData({
      error: error
    })
    if (error == '') {
      return true;
    } else {
      return false;
    }
  }
})