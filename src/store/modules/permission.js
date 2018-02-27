"use strict";
exports.__esModule = true;
/**
 * Created by wisdom on 2018/1/3.
 */
var router_1 = require("router");
var clone = require('clone');
var constantRouterMap = clone(router_1.constantRouterMap);
var asyncRouterMap = clone(router_1.asyncRouterMap);
// fixme: 重置菜单
var SET_ROUTERS = 'SET_ROUTERS';
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.role) {
        return roles.some(function (role) { return route.meta.role.indexOf(role) >= 0; });
    }
    else {
        return true;
    }
}
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
    var accessedRouters = asyncRouterMap.filter(function (route) {
        if (hasPermission(roles, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, roles);
            }
            return true;
        }
        return false;
    });
    return accessedRouters;
}
var vuexUtil_1 = require("../utils/vuexUtil");
/*** state ***/
var state = {
    routers: router_1.constantRouterMap,
    addRouters: []
};
/*** getters ***/
var getters = vuexUtil_1.getter(state, {
    routers: function (state) {
        return state.routers;
    }
});
/*** mutations ***/
var mutations = vuexUtil_1.mutation(state, {
    SET_ROUTERS: function (state, routers) {
        state.addRouters = routers;
        state.routers = [].concat(routers);
    }
});
/*** actions ***/
var actions = vuexUtil_1.action(state, {
    generateRoutes: function (_a, data) {
        var commit = _a.commit;
        return new Promise(function (resolve) {
            var role = data.role;
            var accessedRouters;
            if (role.indexOf('superAdmin') >= 0) {
                accessedRouters = router_1.asyncRouterMap;
            }
            else {
                accessedRouters = filterAsyncRouter(router_1.asyncRouterMap, role);
            }
            commit(SET_ROUTERS, accessedRouters);
            resolve();
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
//# sourceMappingURL=permission.js.map