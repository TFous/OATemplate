"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
// import 'common/registerHooks'
require("assets/style/app.scss");
require("./icons");
var router_1 = require("router");
var store_1 = require("store");
var app_1 = require("pages/app");
var commonApi_1 = require("./api/commonApi");
// register plugins hooks fo vue component
var element_ui_1 = require("element-ui");
require("element-ui/lib/theme-chalk/index.css");
// fixme: 图表组件
var hx_table_1 = require("hx-table");
require("hx-table/dist/styles/common.css");
vue_1["default"].use(element_ui_1["default"], { size: 'mini' });
vue_1["default"].use(hx_table_1["default"], {
    pager_size_opts: [30, 50, 100],
    pager_Size: 30 //  默认显示每页数量，和opts第一个一样
});
var api_1 = require("api");
var api_service_1 = require("api-service");
var baseUrl = {
    imss: localStorage.getItem('imssUrl')
};
// 组建fetch 相关设置
vue_1["default"].prototype.$api = commonApi_1.$api;
vue_1["default"].prototype.api = api_1["default"];
vue_1["default"].prototype.apiService = api_service_1["default"];
vue_1["default"].prototype.$baseUrl = baseUrl;
router_1["default"].beforeEach(function (to, from, next) {
    store_1["default"].dispatch('auth/isExpired');
    if (store_1["default"].getters['auth/isExpired']) {
        vue_1["default"].prototype.$alert('登录已经失效请重新登陆', '登录失效', {
            confirmButtonText: '确定',
            callback: function (action) {
                location.href = 'login.html';
            }
        });
    }
    else {
        next();
    }
});
new vue_1["default"]({
    el: '#app',
    router: router_1["default"],
    store: store_1["default"],
    render: function (h) { return h(app_1["default"]); }
});
//# sourceMappingURL=main.js.map