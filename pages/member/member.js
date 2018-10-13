const app = getApp();
const os = require('../../common/js/base/os.js');
const imath = require('../../common/js/base/math.js');
const icom = require('../../common/js/base/com.js');
const iuser = require('../../common/js/base/user.js');
const config = require('../../config.js');
const util = require('../../utils/utils.js');
//-------------------------------------------------------初始化-------------------------------------------------------
let $page, $query, SessionKey, OpenID;
let PageData = { 
  tabArr: 2,
  ListArr: [
    {
      img: '/images/member/icon-1.png',
      text: '我的额度',
      link: '/pages/index/index'
    },{
      img: '/images/member/icon-2.png',
      text: '我的账单',
      link: '/pages/index/index'
    },{
      img: '/images/member/icon-3.png',
      text: '我的积分',
      link: '/pages/index/index'
    },{
      img: '/images/member/icon-4.png',
      text: '卡片管理',
      link: '/pages/index/index'
    },{
      img: '/images/member/icon-5.png',
      text: '我要办卡',
      link: '/pages/index/index'
    },{
      img: '/images/member/icon-6.png',
      text: '我要分期',
      link: '/pages/index/index'
    },{
      img: '/images/member/icon-7.png',
      text: '我的权益',
      link: '/pages/index/index'
    },
    {
      img: '/images/member/icon-8.png',
      text: '进度查询',
      link: '/pages/index/index'
    }, {
      img: '/images/member/icon-9.png',
      text: '附近优惠',
      link: '/pages/index/index'
    }
  ]
};
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
    app.initApp(false, function () {
      iuser.getUserInfo(init_handler);
      $page.setData({

      })
    });
    this.loadBoxHandle();
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
  toggleClick: app.toggleClick,
  loadBoxHandle:function(){
    icom.loadBox(true);
    setTimeout(()=>{
      icom.loadBox(false);
    },500)
  }
}) //end page

//-------------------------------------------------------业务逻辑-------------------------------------------------------

//---------------------------------------------------------init
function init_handler() {
  console.log('init_handler');
} //end init