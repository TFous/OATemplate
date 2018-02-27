/**
 * Created by wisdom on 2017/12/26.
 */
"use strict";
exports.__esModule = true;
var SET_TABLE_DATA = 'SET_TABLE_DATA';
var vuexUtil_1 = require("../utils/vuexUtil");
/*** state ***/
var state = {
    tableData: []
};
/*** getters ***/
var getters = vuexUtil_1.getter(state, {
    // fixme: 控制侧边栏信息
    tableData: function (state) {
        return state.tableData;
    }
});
/*** mutations ***/
var mutations = vuexUtil_1.mutation(state, {
    // fixme: 控制侧边栏
    SET_TABLE_DATA: function (state, tableData) {
        state.tableData = tableData;
    }
});
/*** actions ***/
var actions = vuexUtil_1.action(state, {
    setTableData: function (_a, tableData) {
        var commit = _a.commit, state = _a.state;
        commit(SET_TABLE_DATA, tableData);
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
//# sourceMappingURL=setMoney.js.map