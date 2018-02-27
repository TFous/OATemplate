"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
/**
 * Created by wisdom on 2017/12/23.
 */
var store_1 = require("store");
var wucc_config_1 = require("../../config/wucc-config");
var api_1 = require("api");
var getAccessToken = function (url, data) {
    // 在这里使用起来就像同步代码那样直观
    var res = api_1["default"].login.getAccess(url, data);
    return res;
};
var getUserProfile = function (url, accessToken) {
    // 在这里使用起来就像同步代码那样直观
    var res = api_1["default"].login.getUserProfile(url, accessToken);
    return res;
};
var revoAccessToken = function (url, data) {
    var res = api_1["default"].login.revoAccess(url, data);
    return res;
};
var changePassword = function (url, data) {
    var res = api_1["default"].login.changePassword(url, data);
    return res;
};
var slientRenew = function () {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var access_token, refresh_token, expiresIn, freshData, resToken, resUser, userProfile, timestamp, user, callbacktime, newTimestamp, time;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('静默登录执行');
                    access_token = '';
                    refresh_token = '';
                    expiresIn = '';
                    freshData = {
                        grant_type: 'refresh_token',
                        refresh_token: JSON.parse(localStorage.getItem(wucc_config_1.STORAGE_IDENTITY_KEY)).refresh_token
                    };
                    return [4 /*yield*/, getAccessToken('', freshData)];
                case 1:
                    resToken = _a.sent();
                    access_token = resToken.access_token;
                    refresh_token = resToken.refresh_token;
                    expiresIn = resToken.expires_in;
                    return [4 /*yield*/, getUserProfile('', access_token)];
                case 2:
                    resUser = _a.sent();
                    userProfile = {};
                    userProfile.profile = resUser;
                    timestamp = (new Date()).getTime() / 1000 + expiresIn;
                    user = Object.assign({}, userProfile, { access_token: access_token }, { expires_at: timestamp }, { refresh_token: refresh_token });
                    callbacktime = user.expires_at - 10;
                    console.log(user);
                    store_1["default"].dispatch('auth/setUser', user);
                    newTimestamp = (new Date()).getTime() / 1000;
                    if (newTimestamp > callbacktime && newTimestamp < (user.expires_at - 2)) {
                        slientRenew();
                    }
                    if (newTimestamp < callbacktime) {
                        time = (callbacktime - newTimestamp) * 1000;
                        setTimeout(function () {
                            slientRenew();
                        }, time);
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports["default"] = {
    // fixme: 获取登录令牌
    loginIn: function (username, password, isRemmber) {
        // fixme: 请求主体
        var body = {};
        // fixme: 登录用户信息记录
        var userSave = {};
        if (JSON.parse(localStorage.getItem(wucc_config_1.USERNAME_KEY))) {
            userSave = JSON.parse(localStorage.getItem(wucc_config_1.USERNAME_KEY));
        }
        /**
         * 登录分为密码登录与refresh_token刷新登录,
         * 记住密码为refresh_token刷新登录
         */
        // fixme: 密码登录
        var data = {
            username: username,
            password: password,
            grant_type: 'password',
            scope: 'openid profile roles rs_userInfo offline_access'
        };
        // fixme: refresh_token刷新登录
        var freshData = {
            grant_type: 'refresh_token',
            refresh_token: password
        };
        // fixme: 根据输入密码判断refresh_token刷新登录还是密码登录
        if (isRemmber === true && userSave[username] === password) {
            body = freshData;
        }
        else {
            body = data;
        }
        return getAccessToken('', body);
    },
    // fixme: 静默登录
    slientRenew: function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, slientRenew()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    // fixme: 获取用户信息
    getUser: function (accessToken) {
        return getUserProfile('', accessToken);
    },
    // fixme: 退出登录
    logout: function () {
        var token = JSON.parse(localStorage.getItem(wucc_config_1.STORAGE_IDENTITY_KEY)).access_token;
        var data = {
            token: token
        };
        return revoAccessToken('', data);
    },
    // fixme: 修改密码
    setPassword: function (data) {
        return changePassword('', data);
    }
};
//# sourceMappingURL=login.service.js.map