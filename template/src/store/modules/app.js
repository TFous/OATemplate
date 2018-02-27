"use strict";
exports.__esModule = true;
/**
 * Created by wisdom on 2017/12/26.
 */
// fixme: 配置用户客户端选项
var CLIENTCONIG = 'CLIENTCONIG';
// fixme: 控制侧边栏
var TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
// fixme: 客户端默认配置
var DEFAULT_CLIENTCONIG = {
    sidebarStatus: false
};
// fixme: 获取客户端配置
function getClientConfig() {
    var ClientConfig = localStorage.getItem(CLIENTCONIG);
    if (ClientConfig) {
        return JSON.parse(ClientConfig);
    }
    else {
        return DEFAULT_CLIENTCONIG;
    }
}
// fixme: 更改客户端配置
function setClientConfig(setMsg) {
    var ClientConfig = JSON.stringify(setMsg);
    localStorage.setItem(CLIENTCONIG, ClientConfig);
}
var vuexUtil_1 = require("../utils/vuexUtil");
/*** state ***/
var state = {
    sidebar: {
        opened: getClientConfig().sidebarStatus
    }
};
/*** getters ***/
var getters = vuexUtil_1.getter(state, {
    // fixme: 控制侧边栏信息
    sidebar: function (state) {
        return state.sidebar;
    }
});
/*** mutations ***/
var mutations = vuexUtil_1.mutation(state, {
    // fixme: 控制侧边栏
    TOGGLE_SIDEBAR: function (state) {
        var data = getClientConfig();
        state.sidebar.opened = !state.sidebar.opened;
        data.sidebarStatus = state.sidebar.opened;
        setClientConfig(data);
    }
});
/*** actions ***/
var actions = vuexUtil_1.action(state, {
    // fixme: 控制侧边栏
    toggleSideBar: function (_a) {
        var commit = _a.commit;
        commit(TOGGLE_SIDEBAR);
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
//# sourceMappingURL=app.js.map