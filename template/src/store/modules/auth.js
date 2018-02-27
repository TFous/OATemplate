"use strict";
exports.__esModule = true;
/**
 * Created by wisdom on 2017/12/27.
 */
/**
 * Created by wisdom on 2017/12/26.
 */
var wucc_config_1 = require("../../config/wucc-config");
var ISEXPIRED = 'ISEXPIRED';
var SETUSER = 'SETUSER';
// fixme: 检测是否过期
function isExpired() {
    var user = state.user;
    // 用户不存在认为已过期
    if (!user) {
        return true;
    }
    // 用户信息不存在认为已过期
    if (!user.profile) {
        return true;
    }
    // 过期时间不存在认为已过期
    if (!user.expires_at) {
        return true;
    }
    // 检测是否过期
    // 单位到秒
    var timestamp = (new Date()).getTime() / 1000;
    return timestamp > user.expires_at;
}
var vuexUtil_1 = require("../utils/vuexUtil");
/*** state ***/
var state = {
    user: JSON.parse(localStorage.getItem(wucc_config_1.STORAGE_IDENTITY_KEY)) || {},
    isExpired: true
};
/*** getters ***/
var getters = vuexUtil_1.getter(state, {
    // fixme: 控制侧边栏信息
    user: function (state) {
        return state.user;
    },
    isExpired: function (state) {
        return state.isExpired;
    }
});
/*** mutations ***/
var mutations = vuexUtil_1.mutation(state, {
    ISEXPIRED: function (state) {
        state.isExpired = isExpired();
    },
    SETUSER: function (state, user) {
        console.log(user);
        localStorage.setItem(wucc_config_1.STORAGE_IDENTITY_KEY, JSON.stringify(user));
        Object.assign(state.user, user);
    }
});
/*** actions ***/
var actions = vuexUtil_1.action(state, {
    isExpired: function (_a) {
        var commit = _a.commit;
        commit(ISEXPIRED);
    },
    setUser: function (_a, user) {
        var commit = _a.commit, state = _a.state;
        commit(SETUSER, user);
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
//# sourceMappingURL=auth.js.map