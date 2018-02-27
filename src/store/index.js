"use strict";
exports.__esModule = true;
/**
 * Created by wisdom on 2017/12/27.
 */
var vue_1 = require("vue");
var vuex_1 = require("vuex");
var vuexUtil_1 = require("./utils/vuexUtil");
// import modules
var app_1 = require("./modules/app");
var tagsView_1 = require("./modules/tagsView");
var auth_1 = require("./modules/auth");
var common_1 = require("./modules/common");
var setMoney_1 = require("./modules/setMoney");
vue_1["default"].use(vuex_1["default"]);
var state = {};
var mutations = vuexUtil_1.mutation(state, {});
var store = new vuex_1["default"].Store({
    strict: process.env.NODE_ENV !== 'production',
    state: state,
    mutations: mutations,
    getters: {},
    actions: {},
    modules: {
        common: common_1["default"],
        app: app_1["default"],
        tagsView: tagsView_1["default"],
        auth: auth_1["default"],
        setMoney: setMoney_1["default"]
    }
});
exports["default"] = store;
//# sourceMappingURL=index.js.map