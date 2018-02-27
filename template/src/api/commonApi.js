"use strict";
exports.__esModule = true;
/**
 * Created by wisdom on 2017/3/21.
 */
var accessToken;
try {
    accessToken = JSON.parse(localStorage.getItem('STORAGE_IDENTITY')).access_token;
}
catch (e) {
}
var headers = new Headers({
    'Accept': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
    'Content-Type': 'application/json;charset=utf-8',
    'Authorization': "Bearer " + accessToken
});
exports.$api = {
    headers: headers,
    request: function (url, obj) {
        if (obj === void 0) { obj = {}; }
        var initObj = Object.assign({
            method: 'GET',
            headers: headers,
            mode: 'cors',
            cache: 'default'
        }, obj);
        return new Request(url, initObj);
    },
    changeTime: function (t) {
        var d = new Date(t).getTime() - 28800000; // 8小时
        var times = new Date(d);
        var year = times.getFullYear();
        var month = (times.getMonth() + 1).toString().length === 2 ? (times.getMonth() + 1) : "0" + (times.getMonth() + 1);
        var day = (times.getDate()).toString().length === 2 ? (times.getDate()) : "0" + (times.getDate());
        var hours = (times.getHours()).toString().length === 2 ? (times.getHours()) : "0" + (times.getHours());
        var minutes = (times.getMinutes()).toString().length === 2 ? (times.getMinutes()) : "0" + (times.getMinutes());
        var seconds = (times.getSeconds()).toString().length === 2 ? (times.getSeconds()) : "0" + (times.getSeconds());
        return year + "-" + month + "-" + day + "T" + hours + ":" + minutes + ":" + seconds + "Z";
    }
};
//# sourceMappingURL=commonApi.js.map