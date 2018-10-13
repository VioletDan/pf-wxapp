const app = getApp();
const os = require('../../common/js/base/os.js');
const imath = require('../../common/js/base/math.js');
const icom = require('../../common/js/base/com.js');
const iuser = require('../../common/js/base/user.js');
const config = require('../../config.js');
const util = require('../../utils/utils.js');
//-------------------------------------------------------初始化-------------------------------------------------------
let $page, $query, SessionKey, OpenID;
let PageData = { };
let off = true;
Page({
  data: Object.assign({
    userInfo: {},
    hasUserInfo: false,
    loadBox: false,
    articleHeight: app.data.articleHeight,
    navigationHeight: app.data.navigationHeight,
    navigationPadding: app.data.navigationPadding,
    iphoneXBar: os.iphoneX,
    bgmBtn: false,
    bgmPlay: false
  }, PageData), //页面的初始数据
  onLoad: function (option) {
    $page = this;
    $query = option;
    console.log('getQueryString', option);
    iuser.getUserInfo(init_handler);
    $page.setData({

    })
  },
  onReady: function () { }, //监听页面初次渲染完成
  onShow: function () {
    // if (app.bgm){
    //     app.bgm.reShow();
    // }//edn if
  }, //监听页面显示
  onHide: function () { }, //监听页面隐藏
  onUnload: function () { }, //监听页面卸载
  onPullDownRefresh: function () { }, //页面相关事件处理函数--监听用户下拉动作
  onReachBottom: function () { }, //页面上拉触底事件的处理函数
  onShareAppMessage: function () { //用户点击右上角分享
    return app.setShareData();
  },
  getUserInfo: function (userRes) {
    // console.log('userRes.detail.errMsg:' + userRes.detail.errMsg);
    if (userRes.detail.errMsg == 'getUserInfo:fail auth deny') {
      wx.showModal({
        title: '提示',
        content: '该小程序需要获取您的昵称和头像,请您允许该小程序访问您的个人信息。',
        showCancel: false
      })
    } else {
      iuser.parse(userRes.detail);
      this.setData({
        hasUserInfo: true,
        userInfo: iuser.userInfo
      });
      init_handler();
    }
  },
  bgmClick: function () {//背景音乐按钮点击事件
    app.bgm.click();
  },
  lottery:function(){
    if(!off){
      icom.alert('您已经抽过奖了');
    }else{
      off = false;
      $page.setData({ rotate: 0,time:0 })
      $page.setData({ ani_light1:'ani_light1'})
      var num = imath.randomRange(0,5)
      var arr1 = [0,240,60,300,120,180]
      //0 iPhonex
      //240 30京东E卡
      //60 30M流量
      //300 10元话费
      //180 5元花费
      //120 10E卡
      let rotate = 360*4 + arr1[num]
      console.log(rotate)
      setTimeout(function(){
        $page.setData({ rotate: rotate, time: 5 })
      },100)
      setTimeout(function () {
        $page.setData({ ani_light1: '' })
        off = true
        $page.lotteryMsg(arr1[num])
        // icom.alert("恭喜你获得“100M流量”，将在首\n次刷卡后5个工作日内到账！")
      }, 5000)
    }
  },
  lotteryMsg:function(num){
    // console.log(num);
    switch (num) {
      case 0:
        icom.alert("恭喜你获得iPhonex")
        break;
      case 240:
        icom.alert("恭喜你获得30京东E卡")
        break;
      case 60:
        icom.alert("恭喜你获得30M流量")
        break;
      case 300:
        icom.alert("恭喜你获得10元话费")
        break;
      case 180:
        icom.alert("恭喜你获得5元花费")
        break;
      case 120:
        icom.alert("恭喜你获得10E卡")
        break;
    }
  }
}) //end page

//-------------------------------------------------------业务逻辑-------------------------------------------------------

//---------------------------------------------------------init
function init_handler() {
  console.log('init_handler');
} //end init