"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var vue_router_1 = require("vue-router");
require("common/registerHooks");
var element_ui_1 = require("element-ui");
require("element-ui/lib/theme-chalk/index.css");
// import router from 'router'
// import store from 'store'
var login_1 = require("pages/login");
vue_1["default"].use(element_ui_1["default"]);
vue_1["default"].use(vue_router_1["default"]);
new vue_1["default"]({
    el: '#app',
    // router,
    render: function (h) { return h(login_1["default"]); }
});
//# sourceMappingURL=login-main.js.map