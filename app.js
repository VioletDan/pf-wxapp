const config = require('config.js');
const iuser = require('common/js/base/user.js');
const os = require('common/js/base/os.js');
const imath = require('common/js/base/math.js');
const icom = require('common/js/base/com.js');

//小程序顶部bar设置成自定义模式
let navigationStyle = 'custom';
let navigationHeight = navigationStyle == 'default' ? 0 : (os.ios ? 66 : 82);
let navigationPadding = navigationStyle == 'default' ? 0 : (os.iphoneX ? 96 : 48);
let iphoneXHeight = os.iphoneX ? 70 : 0;
// let articleHeight = 'calc( 100%' + ' - ' + (navigationHeight + navigationPadding + iphoneXHeight) + 'rpx' + ' )';
let articleHeight = 'calc( 100%' + ' - ' + (0) + 'rpx' + ' )';
App({
    onLaunch: function (options) {
        console.log('onLaunch', options);

        //播放背景音乐
        // this.bgm = require('common/js/base/bgm.js');
        // this.bgm.on({ src: 'http://t.sky.be-xx.com/wxapp/wxapp_frame/sound/bgm.mp3'});
    },
    /**
     * 初始化
     * @params {Boolean}  needUserInfo 是否需要获取用户头像和昵称 否则只拿login的code
     * @params {Function} cb 回调函数
     * */ 
    initApp: function (needUserInfo, cb) {
        //用户登录获取code 如果需要用户信息 则去拉取用户信息
        iuser.login(() => {
            if (needUserInfo){
                this.initUserInfo(cb);
            }else{
                cb();
            }
        });
      let pages = getCurrentPages();
      pages[pages.length - 1].toggleClick = this.toggleClick;
    },

    /**
     * 全局参数
     * */
    data:{
        articleHeight: articleHeight,
        navigationHeight: navigationHeight + 'rpx',
        navigationPadding: navigationPadding + 'rpx',
    },

    /**
     * @params {Function} cb 回调函数
     * */
    initUserInfo: function (cb) {
        //没有用户信息
        if (this.globalData.userInfo == null) {
            iuser.getUserInfo((res) => {
                if (res) {
                    //初始化用户 res 为true的时候说明已经授权过了 可以直接返回用户信息
                    this.globalData.userInfo = iuser.userInfo;
                    this.setPageData({ userInfo: iuser.userInfo });
                    cb();
                } else {
                    let pages = getCurrentPages();
                    let curPage = pages[pages.length - 1];
                    let authOption = {
                        route: curPage.route,
                        options: curPage.options,
                    }
                    //存储一下携带的数据 方便 后面返回的时候参数不丢失
                    wx.setStorageSync('authOption', JSON.stringify(authOption));
                    wx.redirectTo({
                        url: '/pages/auth/auth',
                    })
                }
            });
        } else {
            console.log(this.globalData);
            this.setPageData({ userInfo: iuser.userInfo });
            cb();
        }
    },
    //初始化 end

    setPageData: function (data) {
        let pages = getCurrentPages();
        pages[pages.length - 1].setData(data);
    },

    shareSuccess: function () {
    },

    shareFail: function () {
    },

    setShareData: function (options) {
        let defaults = { title: config.shareData.title, path: config.shareData.path, imageUrl: config.shareData.imageUrl, onSuccess: this.shareSuccess, onFail: this.shareFail };
        let opts={};
        Object.assign(opts, defaults, options);
        console.log(opts);
        return {
            title: opts.title,
            path: opts.path,
            imageUrl: opts.imageUrl,
            success: function (res) {
                console.log(res.errMsg);
                opts.onSuccess();
            },
            fail: function (res) {
                console.log(res.errMsg);
                opts.onFail();
            }
        };
    },
    
    onShow: function () {
        // if (this.bgm.stopByAppHide && this.bgm.playing){
        //     this.bgm.stopByAppHide = false;
        //     this.bgm.play();
        // }//edn if
    }, 

    onHide: function () { 
        // this.bgm.stopByAppHide=true;
    },

    closePop: function (e) {
        let id = e.currentTarget.id;
        console.log(id);
        let fade = 'fade' + id.substr(3);
        console.log(fade);
        icom.hide(id, fade);
    },//edn func
    toggleClick:function(e){
      var id = e.currentTarget.dataset.id;
      let pages = getCurrentPages();
      console.log(pages[pages.length - 1].data.tabArr)
      if (pages[pages.length - 1].data.tabArr!=id){
        if(id == 0){
          wx.redirectTo({url: '/pages/life/life'});
        }else if(id == 1){
          wx.redirectTo({ url: '/pages/index/index' });
        }else if(id == 2){
          wx.redirectTo({ url: '/pages/member/member' });
        }
      }
      // //重置tabArr
      // this.setPageData({tabArr: id});
    }
})