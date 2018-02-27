/**
 * Created by wisdom on 2018/1/3.
 */
import { asyncRouterMap, constantRouterMap } from 'router'
const clone = require('clone')
let constantRouterMap = clone(constantRouterMap)
let asyncRouterMap = clone(asyncRouterMap)

// fixme: 重置菜单
const SET_ROUTERS = 'SET_ROUTERS'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.role) {
        return roles.some(role => route.meta.role.indexOf(role) >= 0)
    } else {
        return true
    }
}


/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
    const accessedRouters = asyncRouterMap.filter(route => {
        if (hasPermission(roles, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, roles)
            }
            return true
        }
        return false
    })
    return accessedRouters
}

import {
    State as vState,
    Getter as vGetter,
    Mutation as vMutation,
    Action as vAction,
    namespace
} from 'vuex-class'

import {
    getter,
    mutation,
    action,
    decorator
} from '../utils/vuexUtil'

/*** state ***/
let state = {
    routers: constantRouterMap,
    addRouters: []
}

/*** getters ***/
let getters = getter(state, {

    routers (state) {
        return state.routers
    },

})

/*** mutations ***/
let mutations = mutation(state, {
    SET_ROUTERS: (state, routers) => {
        state.addRouters = routers
        state.routers = [].concat(routers)
    }
})

/*** actions ***/
let actions = action(state, {
    generateRoutes({ commit }, data) {
        return new Promise(resolve => {
            let { role } = data
            let accessedRouters
            if (role.indexOf('superAdmin') >= 0) {
                accessedRouters = asyncRouterMap
            } else {
                accessedRouters = filterAsyncRouter(asyncRouterMap, role)
            }
            commit(SET_ROUTERS, accessedRouters)
            resolve()
        })
    }
})

/*** module store ***/
let store = {
    namespaced: true,
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
}

export default store
