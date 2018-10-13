//页面的request请求都放这里 方便管理
//主要是为了处理sessionkey
//获取应用实例
let SERVER_URL = "";
let key = '';

let errmsgAlert = function (value) {
    value = value || '无';
    wx.showModal({
        title: '提示',
        content: value,
        showCancel: false
    })
}

var API = {

    _send: function (url, data, method, onSucces, onFail) {
        if (key != '') {
            data.SessionKey = key;
        }
        wx.request({
            url: SERVER_URL + url,
            data: data,
            method: method,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            success: (res) => {
                onSucces(res.data);
                console.log('API SUCCESS');
                console.log(url);
                console.log(res.data);
            },
            fail: (err) => {
                console.log('API ERROR');
                console.log(url);
                console.log(err);
                if (onFail) onFail(err);
                errmsgAlert(url + ' error');
            }
        });

    },

    //通用login 所有小程序都会有登陆授权操作 去服务器获取sessionkey
    login: function(code){
        //每次login都要重新获取一下code
        
    }

};


module.exports = API;