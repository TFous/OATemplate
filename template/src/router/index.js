"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var vue_router_1 = require("vue-router");
var layout_1 = require("../components/layout");
// routes
// import homeRoute from './home'
// import productRoute from './product'
var wucc_config_1 = require("../config/wucc-config");
vue_1["default"].use(vue_router_1["default"]);
var constantRouterMap = [
    { path: '/404', component: getView('error404'), hidden: true },
    {
        path: '/',
        component: getView("client"),
        redirect: '/client',
        name: 'index',
        hidden: true
    },
    {
        path: '/client',
        component: layout_1["default"],
        redirect: '/client/client',
        name: '次席信息管理',
        meta: { title: '次席信息管理', icon: 'component' },
        children: [{
                path: 'client',
                name: 'client',
                component: getView("client"),
                meta: { title: '次席信息管理', icon: 'component' }
            }]
    },
    {
        path: '/changeHistory',
        component: layout_1["default"],
        redirect: '/changeHistory/changeHistory',
        name: 'changeHistory',
        meta: { title: '次席变更记录', icon: 'international' },
        children: [{
                path: 'changeHistory',
                name: 'changeHistory',
                component: getView("changeHistory"),
                meta: { title: '次席变更记录', icon: 'zip' }
            }]
    },
    {
        path: '/setMoney',
        component: layout_1["default"],
        redirect: '/setMoney/setMoney',
        name: 'setMoney',
        meta: { title: '出金参数设置', icon: 'international' },
        children: [{
                path: 'setMoney',
                name: 'setMoney',
                component: getView("setMoney"),
                meta: { title: '出金参数设置', icon: 'zip' }
            }]
    }
];
var asyncRouterMap = [
    { path: '*', redirect: '/404', hidden: true },
    {
        path: '/synStream',
        component: layout_1["default"],
        redirect: '/synStream/synStream',
        name: 'synStream',
        meta: { title: '操作同步流水', icon: 'international' },
        children: [{
                path: 'synStream',
                name: 'synStream',
                component: getView("synStream"),
                meta: { title: '操作同步流水', icon: 'withdraw' }
            }]
    },
    {
        path: '/dictionaries',
        component: layout_1["default"],
        redirect: '/dictionaries/immsNames',
        name: 'dictionaries',
        meta: { title: '数据字典', icon: 'dictionaries', role: ['admin'] },
        children: [
            {
                path: 'dictionaries',
                name: 'dictionaries',
                component: getView("dictionaries"),
                meta: { title: '数据字典', icon: 'dictionaries', role: ['admin'] }
            }
        ]
    },
];
var role = JSON.parse(localStorage.getItem(wucc_config_1.STORAGE_IDENTITY_KEY)).profile.role;
function getView(name) {
    return function (resolve, reject) {
        require.ensure([], function (require) {
            resolve(require("pages/" + name + "/index.ts"));
        }, reject, 'product');
    };
}
function hasPermission(roles, route) {
    if (route.meta && route.meta.role) {
        return roles.some(function (role) { return route.meta.role.indexOf(role) >= 0; });
    }
    else {
        return true;
    }
}
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
var accessedRouters;
if (role.indexOf('superAdmin') >= 0) {
    accessedRouters = asyncRouterMap;
}
else {
    accessedRouters = filterAsyncRouter(asyncRouterMap, role);
}
exports.routers = constantRouterMap.concat(accessedRouters);
var routes = exports.routers;
exports["default"] = new vue_router_1["default"]({
    mode: 'history',
    routes: routes
});
//# sourceMappingURL=index.js.map