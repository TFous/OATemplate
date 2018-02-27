"use strict";
exports.__esModule = true;
/**
 * Created by wisdom on 2017/12/27.
 */
var ADD_VISITED_VIEWS = 'ADD_VISITED_VIEWS';
var DEL_VISITED_VIEWS = 'DEL_VISITED_VIEWS';
var DEL_OTHERS_VIEWS = 'DEL_OTHERS_VIEWS';
var DEL_ALL_VIEWS = 'DEL_ALL_VIEWS';
var vuexUtil_1 = require("../utils/vuexUtil");
/*** state ***/
var state = {
    visitedViews: [],
    cachedViews: []
};
/*** getters ***/
var getters = vuexUtil_1.getter(state, {
    visitedViews: function (state) { return state.visitedViews; },
    cachedViews: function (state) { return state.cachedViews; }
});
/*** mutations ***/
var mutations = vuexUtil_1.mutation(state, {
    ADD_VISITED_VIEWS: function (state, view) {
        var isExist = false;
        state.visitedViews.forEach(function (item, key) {
            // 如果name 更改名字随之更改
            if (item.path === view.path) {
                state.visitedViews[key].query = view.query;
                if (view.query.Name) {
                    state.visitedViews[key].title = "(" + view.query.Name + ")" + view.meta.title;
                }
                isExist = true;
                return;
            }
        });
        if (isExist)
            return;
        var obj = {};
        obj.name = view.name;
        obj.path = view.path;
        obj.params = view.params;
        obj.query = view.query;
        obj.title = view.meta.title;
        if (view.query.Name) {
            obj.title = "(" + view.query.Name + ")" + view.meta.title;
        }
        if (!view.meta.title) {
            obj.title = 'no-name';
        }
        state.visitedViews.push(obj);
        if (!view.meta.noCache) {
            state.cachedViews.push(view.name);
        }
    },
    DEL_VISITED_VIEWS: function (state, view) {
        state.visitedViews.forEach(function (v, i) {
            if (v.path === view.path) {
                state.visitedViews.splice(i, 1);
            }
            return;
        });
        for (var _i = 0, _a = state.cachedViews; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i === view.name) {
                var index = state.cachedViews.indexOf(i);
                state.cachedViews.splice(index, index + 1);
                break;
            }
        }
    },
    DEL_OTHERS_VIEWS: function (state, view) {
        state.visitedViews.forEach(function (v, i) {
            if (v.path === view.path) {
                state.visitedViews = state.visitedViews.slice(i, i + 1);
            }
            return;
        });
        for (var _i = 0, _a = state.cachedViews; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i === view.name) {
                var index = state.cachedViews.indexOf(i);
                state.cachedViews = state.cachedViews.slice(index, i + 1);
                break;
            }
        }
    },
    DEL_ALL_VIEWS: function (state) {
        state.visitedViews = [];
        state.cachedViews = [];
    }
});
/*** actions ***/
var actions = vuexUtil_1.action(state, {
    addVisitedViews: function (_a, view) {
        var commit = _a.commit;
        commit(ADD_VISITED_VIEWS, view);
    },
    delVisitedViews: function (_a, view) {
        var commit = _a.commit, state = _a.state;
        return new Promise(function (resolve) {
            commit(DEL_VISITED_VIEWS, view);
            resolve(state.visitedViews.slice());
        });
    },
    delOthersViews: function (_a, view) {
        var commit = _a.commit, state = _a.state;
        return new Promise(function (resolve) {
            commit(DEL_OTHERS_VIEWS, view);
            resolve(state.visitedViews.slice());
        });
    },
    delAllViews: function (_a) {
        var commit = _a.commit, state = _a.state;
        return new Promise(function (resolve) {
            commit(DEL_ALL_VIEWS);
            resolve(state.visitedViews.slice());
        });
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
//# sourceMappingURL=tagsView.js.map