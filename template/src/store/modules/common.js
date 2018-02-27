/**
 * Created by wisdom on 2017/12/26.
 */
"use strict";
exports.__esModule = true;
var vuexUtil_1 = require("../utils/vuexUtil");
var SET_COMMON = 'SET_COMMON';
/*** state ***/
var state = {
    layerShow: false,
    userMsg: {}
};
/*** getters ***/
var getters = vuexUtil_1.getter(state, {});
/*** mutations ***/
var mutations = vuexUtil_1.mutation(state, {
    SET_COMMON: function (state, view) {
        Object.assign(state, view);
    }
});
/*** actions ***/
var actions = vuexUtil_1.action(state, {
    setcommon: function (_a, view) {
        var commit = _a.commit, state = _a.state;
        commit(SET_COMMON, view);
    }
});
/*** module store ***/
var store = {
    namespaced: true,
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
};
exports["default"] = store;
//# sourceMappingURL=common.js.map