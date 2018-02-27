"use strict";
exports.__esModule = true;
/**
 * Created by wisdom on 2017/12/23.
 */
var axios_1 = require("axios");
var stringify = require("qs/lib/stringify");
var site_config_js_1 = require("../../config/site-config.js");
var wucc_config_1 = require("../../config/wucc-config");
var vue_1 = require("vue");
// fixme: baseURL
var host = site_config_js_1.identitySiteRoot;
// fixme: 请求token地址
var tokenUrl = '/identity/connect/token';
// fixme: 失效token地址
var revotokenUrl = "/identity/connect/revocation";
// fixme: 请求用户信息
var userUrl = '/identity/connect/userinfo';
// fixme: 更改密码
var changePasswordUrl = '/api/odata/User/WUCC.ChangePassword';
// fixme: 客户端ID
var client_id = wucc_config_1.CLIENT_ID;
// fixme: 客户端密匙
var client_secret = wucc_config_1.CLIENT_SECRET;
var auth = 'Basic ' + btoa(client_id + ':' + client_secret);
// fixme:build http header
function buildHeader() {
    return _a = {},
        _a['Authorization'] = auth,
        _a['Content-Type'] = 'application/x-www-form-urlencoded',
        _a;
    var _a;
}
exports.ax = axios_1["default"].create({
    baseURL: host,
    headers: buildHeader(),
    timeout: 10000,
    responseType: 'json',
    transformRequest: [function (data) {
            if (data instanceof FormData)
                return data;
            return stringify(data);
        }]
    // transformResponse: [function (data) {
    //     if (data) {
    //         return data
    //     } else {
    //         let msg = 'Unknow Error'
    //         throw new Error(msg)
    //     }
    // }]
});
function processData(data) {
    if (data === void 0) { data = {}; }
    if (data instanceof FormData) {
        // data.append('token', token)
    }
    else {
        // data.token = token
    }
    return data;
}
// 处理错误
function handleError(err) {
    // 如果是手动取消的请求，不显示错误信息
    if (axios_1["default"].isCancel(err)) {
        console.log(err);
    }
    else {
        alert(err);
    }
}
// http get method
function get(url, accessToken) {
    var axGetUser = axios_1["default"].create({
        baseURL: host,
        headers: (_a = {},
            _a['Authorization'] = 'Bearer ' + accessToken,
            _a),
        timeout: 10000,
        responseType: 'json',
        transformRequest: [function (data) {
                if (data instanceof FormData)
                    return data;
                return stringify(data);
            }],
        transformResponse: [function (data) {
                if (data) {
                    return data;
                }
                else {
                    var msg = 'Unknow Error';
                    throw new Error(msg);
                }
            }]
    });
    return axGetUser.get(url).then(function (res) {
        return res.data;
    })["catch"](function (err) {
        // handleError(err)
        vue_1["default"].prototype.$notify.error({
            title: '出现错误',
            message: err,
            showClose: false
        });
        throw err;
    });
    var _a;
}
// http post method
function post(url, data) {
    return exports.ax.post(url, processData(data))
        .then(function (res) {
        return res.data;
    })["catch"](function (err) {
        vue_1["default"].prototype.$notify.error({
            title: '出现错误',
            dangerouslyUseHTMLString: true,
            message: err.response
            // showClose: false
        });
        throw err;
    });
}
// fixme: 请求user信息方法
function postPassword(url, data) {
    var axGetUser = axios_1["default"].create({
        baseURL: host,
        headers: (_a = {},
            _a['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem(wucc_config_1.STORAGE_IDENTITY_KEY)).access_token,
            _a['Content-Type'] = 'application/json',
            _a),
        timeout: 10000,
        responseType: 'json',
        transformResponse: [function (data) {
                if (data) {
                    return data;
                }
                else {
                    var msg = 'Unknow Error';
                    throw new Error(msg);
                }
            }]
    });
    return axGetUser.post(url, data)
        .then(function (res) {
        return res;
    })["catch"](function (err) {
        vue_1["default"].prototype.$notify.error({
            title: '出现错误',
            message: err,
            showClose: false
        });
        throw err;
    });
    var _a;
}
exports["default"] = {
    // fixme: 请求token方法
    getAccess: function (url, data) {
        return post(tokenUrl + url, data);
    },
    // fixme: 失效token方法
    revoAccess: function (url, data) {
        return post(revotokenUrl + url, data);
    },
    // fixme: 请求user信息方法
    getUserProfile: function (url, accessToken) {
        return get(userUrl + url, accessToken);
    },
    // fixme: 请求user信息方法
    changePassword: function (url, data) {
        return postPassword(changePasswordUrl + url, data);
    }
};
//# sourceMappingURL=login.js.map