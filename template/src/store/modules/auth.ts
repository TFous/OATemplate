/**
 * Created by wisdom on 2017/12/27.
 */
/**
 * Created by wisdom on 2017/12/26.
 */
import { USERNAME_KEY, STORAGE_IDENTITY_KEY, CLIENT_ID, CLIENT_SECRET } from '../../config/wucc-config'
const ISEXPIRED = 'ISEXPIRED'
const SETUSER = 'SETUSER'

// fixme: 检测是否过期
function isExpired () {
    let user = state.user

    // 用户不存在认为已过期
    if (!user) {
        return true
    }

    // 用户信息不存在认为已过期
    if (!user.profile) {
        return true
    }

    // 过期时间不存在认为已过期
    if (!user.expires_at) {
        return true
    }

    // 检测是否过期
    // 单位到秒
    var timestamp = (new Date()).getTime() / 1000

    return timestamp > user.expires_at
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
    user: JSON.parse(localStorage.getItem(STORAGE_IDENTITY_KEY)) || {},
    isExpired: true
}

/*** getters ***/
let getters = getter(state, {
    // fixme: 控制侧边栏信息
    user (state) {
        return state.user
    },

    isExpired (state) {
        return state.isExpired
    }

})

/*** mutations ***/
let mutations = mutation(state, {
    ISEXPIRED (state) {
        state.isExpired = isExpired()
    },

    SETUSER: (state, user) => {
        Object.assign(state.user, user)
    }
})

/*** actions ***/
let actions = action(state, {

    isExpired({ commit }) {
        commit(ISEXPIRED)
    },

    setUser ({ commit, state }, user) {
        commit(SETUSER, user)
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

