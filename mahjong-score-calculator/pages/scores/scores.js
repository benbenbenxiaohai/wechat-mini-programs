// pages/score/score.js
/**
 * 以round为单位
 */

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gameArr: [],
    currentGameIdx: '',
    currentRoundNo: '',
    playerName1: '',
    playerName2: '',
    playerName3: '',
    playerName4: '',
    switchChecked1: false,
    switchChecked2: false,
    switchChecked3: false,
    switchChecked4: false,
    switches: [],
    switchQuanbaoChecked1: false,
    switchQuanbaoChecked2: false,
    switchQuanbaoChecked3: false,
    switchQuanbaoChecked4: false,
    switchesQuanbao: [],
    fanId1: '1',
    fanId2: '2',
    fanId3: '3',
    fanId4: '4',
    fanArr: [],
    sum1: '',
    sum2: '',
    sum3: '',
    sum4: '',
    cntJinDing1: '',
    cntJinDing2: '',
    cntJinDing3: '',
    cntJinDing4: '',
    previousRoundScore1: '',
    previousRoundScore2: '',
    previousRoundScore3: '',
    previousRoundScore4: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      switchChecked1: false,
      switchChecked2: false,
      switchChecked3: false,
      switchChecked4: false,
      switches: [],
      switchQuanbaoChecked1: false,
      switchQuanbaoChecked2: false,
      switchQuanbaoChecked3: false,
      switchQuanbaoChecked4: false,
      switchesQuanbao: [],
      fanArr: []
    });

    this.data.gameArr = wx.getStorageSync('gameArr');
    this.data.currentGameIdx = app.globalData.currentGameIdx
    console.log("DEBUG: Found current game index '" + this.data.currentGameIdx + "'");
    this.setData({
      playerName1: this.data.gameArr[this.data.currentGameIdx].playerNameArr[0],
      playerName2: this.data.gameArr[this.data.currentGameIdx].playerNameArr[1],
      playerName3: this.data.gameArr[this.data.currentGameIdx].playerNameArr[2],
      playerName4: this.data.gameArr[this.data.currentGameIdx].playerNameArr[3],
    })

    var currentRoundIdx = this.data.gameArr[this.data.currentGameIdx].roundArr.length;
    console.log("DEBUG: Found current round index '" + currentRoundIdx + "'");

    //setData is used for binding data between js and wxml
    this.setData({
      currentRoundNo: currentRoundIdx + 1
    })

    var roundArr = this.data.gameArr[this.data.currentGameIdx].roundArr;
    var sum = [0, 0, 0, 0];
    var cntJinDing = [0, 0, 0, 0];
    if (roundArr.length > 0) {
      for (var i = 0; i < roundArr.length; i++) {
        for (var j = 0; j < 4; j++) {
          sum[j] += roundArr[i].scoreArr[j];
          if (roundArr[i].scoreArr[j] == Math.pow(2, (app.globalData.capFan - 4)) * 3) {//192
            cntJinDing[j]++;
          }
        }
      }

      this.setData({
        previousRoundScore1: roundArr[roundArr.length - 1].scoreArr[0],
        previousRoundScore2: roundArr[roundArr.length - 1].scoreArr[1],
        previousRoundScore3: roundArr[roundArr.length - 1].scoreArr[2],
        previousRoundScore4: roundArr[roundArr.length - 1].scoreArr[3]
      })
    }
    this.setData({
      sum1: sum[0],
      sum2: sum[1],
      sum3: sum[2],
      sum4: sum[3],
      cntJinDing1: cntJinDing[0],
      cntJinDing2: cntJinDing[1],
      cntJinDing3: cntJinDing[2],
      cntJinDing4: cntJinDing[3]
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

  },

  switchChange1: function(e) {
    this._switchChange(e, 0);
  },

  switchChange2: function (e) {
    this._switchChange(e, 1);
  },

  switchChange3: function (e) {
    this._switchChange(e, 2);
  },

  switchChange4: function (e) {
    this._switchChange(e, 3);
  },

  _switchChange: function(e, i) {
    var switchVal = e.detail.value;
    console.log("DEBUG: Input switch" + (i + 1) + " is changed to '" + switchVal + "'");
    this.data.switches[i] = switchVal;
  },

  fanInput: function(e) {
    var fanId = e.target.id;
    var fan = e.detail.value;
    console.log("DEBUG: Input fanId '" + fanId + "' with fan '" + fan + "'");
    this.data.fanArr[fanId - 1] = fan;
  },

  switchQuanbaoChange1: function (e) {
    this._switchQuanbaoChange(e, 0);
  },

  switchQuanbaoChange2: function (e) {
    this._switchQuanbaoChange(e, 1);
  },

  switchQuanbaoChange3: function (e) {
    this._switchQuanbaoChange(e, 2);
  },

  switchQuanbaoChange4: function (e) {
    this._switchQuanbaoChange(e, 3);
  },

  _switchQuanbaoChange: function (e, i) {
    var switchVal = e.detail.value;
    console.log("DEBUG: Input switch(quanbao)" + (i + 1) + " is changed to '" + switchVal + "'");
    this.data.switchesQuanbao[i] = switchVal;
  },

  submitFan: function() {
    if (this._validateInput()) {
      var round = this._generateRound();

      this.data.gameArr[this.data.currentGameIdx].roundArr.push(round);

      wx.setStorageSync('gameArr', this.data.gameArr);

      this.onLoad();
    }
  },

  _validateInput: function () {
    var error = '';
    
    error += this._getErrorFromSwitches();
    error += this._getErrorFromInputBox();
    error += this._getErrorFromSwitchesQuanbao();
    
    this.setData({
      error: error
    })

    if (error == '') {
      return true;
    } else {
      return false;
    }
  },

  _getErrorFromSwitches: function() {
    var error = '';

    var switchTrueFound = false;
    for (var i = 0; i < 4; i++) {
      var switchi = this.data.switches[i];
      if (switchi) {
        if (switchTrueFound) {
          error += "只有一个玩家赢 \n";
          break;
        }
        switchTrueFound = true;
      }
    }
    if (!switchTrueFound) {
      error += "必须有一个玩家赢 \n";
    }

    return error;
  },

  _getErrorFromInputBox: function() {
    var error = '';

    for (var i = 0; i < 4; i++) {
      var fan = this.data.fanArr[i];
      if (fan == null || fan == '') {
        error += "玩家" + (i + 1) + "的番数不能为空 \n";
      } else if (isNaN(fan)) {
        error += "玩家" + (i + 1) + "的番数必须是数字 \n";
      } else {
        var fanNum = Number(fan);
        if (!Number.isInteger(fanNum) || fanNum < 0) {
          error += "玩家" + (i + 1) + "的番数必须为正整数 \n";
        }
      }
    }

    return error;
  },

  _getErrorFromSwitchesQuanbao: function () {
    var error = '';

    var winnerIdx = 0;
    var quanbaoIdx = -1;
    var switchTrueFound = false;
    for (var i = 0; i < 4; i++) {
      var switchi = this.data.switches[i];
      if (switchi) {
        winnerIdx = i;
      }
      var switchQuanbao = this.data.switchesQuanbao[i];
      if (switchQuanbao) {
        quanbaoIdx = i;
        if (switchTrueFound) {
          error += "只有一个玩家赢 \n";
          break;
        }
        switchTrueFound = true;
      }
    }
    if (winnerIdx == quanbaoIdx) {
      error += "赢家不能全包 \n";
    }

    return error;
  },

  _generateRound: function() {
    //positive fan/score means win; negative fan/score means lose

    //get inital values, including fanArr, winnerIdx, quanbaoIdx, winnerFan, loserFanSum
    var winnerIdx = 0;
    var quanbaoIdx = -1;
    var loserFanSum = 0;
    for (var i = 0; i < 4; i++) {
      this.data.fanArr[i] = Number(this.data.fanArr[i]);
      if (this.data.switches[i]) {
        winnerIdx = i;
      } else {
        this.data.fanArr[i] = this.data.fanArr[i] * (-1);
        loserFanSum += this.data.fanArr[i];
      }
      if (this.data.switchesQuanbao[i]) {
        quanbaoIdx = i;
      }
    }
    var winnerFan = this.data.fanArr[winnerIdx];

    //get relative fan array
    var relativeFanArr = [];
    for (var i = 0; i < 4; i++) {
      if (i == winnerIdx) {
        relativeFanArr[i] = winnerFan - loserFanSum;
      } else {
        relativeFanArr[i] = this.data.fanArr[i] - winnerFan;
      }
    }

    //get score array, considering jin ding, quan bao
    var scoreArr = [];
    if (relativeFanArr[(winnerIdx + 1) % 4] <= app.globalData.capFan * (-1) &&
      relativeFanArr[(winnerIdx + 2) % 4] <= app.globalData.capFan * (-1) &&
      relativeFanArr[(winnerIdx + 3) % 4] <= app.globalData.capFan * (-1)
    ) {
      //jin ding
      var loserScore = Math.pow(2, (app.globalData.capFan - 4)) * (-1);//-64
      scoreArr[winnerIdx] = loserScore * 3 * (-1);
      scoreArr[(winnerIdx + 1) % 4] = loserScore;
      scoreArr[(winnerIdx + 2) % 4] = loserScore;
      scoreArr[(winnerIdx + 3) % 4] = loserScore;
    } else {
      //not jin ding
      var loserScoreSumAdjusted = 0;
      for (var i = 0; i < 4; i++) {
        if (i != winnerIdx) {
          var loserScore = 0;
          if (relativeFanArr[i] <= app.globalData.capFan * (-1)) {
            loserScore = app.globalData.capScore * (-1);
            scoreArr[i] = loserScore;
          } else {
            loserScore = Math.pow(2, (relativeFanArr[i] * (-1) - 4)) * (-1);
            scoreArr[i] = loserScore;
          }
          loserScoreSumAdjusted += loserScore;
        }
      }
      scoreArr[winnerIdx] = loserScoreSumAdjusted * (-1);
    }
    //quanbao
    if (quanbaoIdx != -1) {
      var quanbaoScore = 0;
      for (var i = 0; i < 4; i++) {
        if (i != winnerIdx) {
          quanbaoScore += scoreArr[i];
          if (i != quanbaoIdx) {
            scoreArr[i] = 0;
          }
        }
      }
      scoreArr[quanbaoIdx] = quanbaoScore;
    }

    //set round object
    var round = {};
    round.fanArr = this.data.fanArr;
    round.relativeFanArr = relativeFanArr;
    round.scoreArr = scoreArr;
    round.winnerIdx = winnerIdx;
    if (quanbaoIdx != -1) {
      round.quanbaoIdx = quanbaoIdx;
    }
    
    return round;
  },

  toSummary: function() {
    wx.navigateTo({
      url: '../summary/summary',
    })
  },

  deletePrevRound: function() {
    console.log("DEBUG: Deleting previous round");
    if (this.data.gameArr[this.data.currentGameIdx].roundArr.length > 0) {
      this.data.gameArr[this.data.currentGameIdx].roundArr.pop();

      wx.setStorageSync('gameArr', this.data.gameArr);

      this.onLoad();
    }
  }
})