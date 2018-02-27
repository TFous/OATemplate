/**
 * api http base
 * @author Allenice
 * @since 2017-06-30 05:35:10
 */
"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var stringify = require("qs/lib/stringify");
var vue_1 = require("vue");
var host = '/';
// build http header
function buildHeader() {
    return {};
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
// function processData (data: any = {}) {
//     if (data instanceof FormData) {
//         // data.append('token', token)
//     } else {
//         // data.token = token
//     }
//
//     return data
// }
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
function get(url) {
    // return ax.get(url, {
    //     params: data
    // }).then((res) => {
    //     return res.data
    // }).catch((err) => {
    //     handleError(err)
    //     throw err
    // })
    var isRequestOk;
    var requestDataHeader = vue_1["default"].prototype.$api.request(url);
    return fetch(requestDataHeader).then(function (resp) {
        isRequestOk = resp.ok;
        return resp.json();
    }).then(function (data) {
        if (isRequestOk === false) {
            _this.$notify.error({
                title: '错误消息',
                message: data.message
            });
            return false;
        }
        return data;
    });
}
exports.get = get;
// http post method
function post(url, data) {
    return exports.ax.post(url, data)
        .then(function (res) {
        return res.data;
    })["catch"](function (err) {
        handleError(err);
        throw err;
    });
}
exports.post = post;



// delete, put, patch,etc ....
//# sourceMappingURL=http.js.map