//app.js
/**
 * Data Storage Structure:
 *  gameArr: [game1, game2, ..., gameN]
 *    game: {playerNameArr, roundArr}
 *      playerNameArr: [playerName1, playerName2, playerName3, playerName4]
 *      roundArr: [round1, round2, ..., roundN]
 *        round: {fanArr, scoreArr}
 *          fanArr: [fan1, fan2, fan3, fan4]
 *          scoreArr: [score1, score2, score3, score4]
 *      created: "current timestamp string"
 */
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //set new game idx
    // var gameSize = 0;
    // var gameArr = wx.getStorageSync('gameArr');
    // if (gameArr != null) {
    //   gameSize = gameArr.length;
    // }
    // this.globalData.currentGameIdx = gameSize;

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    currentGameIdx: "",
    capFan: 10,
    capScore: 50
  }
})