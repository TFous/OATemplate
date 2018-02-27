/**
 * Created by wisdom on 2017/12/26.
 */
// fixme: 配置用户客户端选项
const CLIENTCONIG: string = 'CLIENTCONIG'

// fixme: 控制侧边栏
const TOGGLE_SIDEBAR: string = 'TOGGLE_SIDEBAR'

// fixme: 客户端默认配置
const DEFAULT_CLIENTCONIG: object = {
    sidebarStatus: false
}

// fixme: 获取客户端配置
function getClientConfig (): object {
    let ClientConfig  = localStorage.getItem(CLIENTCONIG)
    if (ClientConfig) {
        return JSON.parse(ClientConfig)
    } else {
        return DEFAULT_CLIENTCONIG
    }
}

// fixme: 更改客户端配置
function setClientConfig (setMsg: object): any {
    let ClientConfig  = JSON.stringify(setMsg)
    localStorage.setItem(CLIENTCONIG, ClientConfig)
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
    sidebar: {
      opened: getClientConfig().sidebarStatus
    }
}

/*** getters ***/
let getters = getter(state, {
    // fixme: 控制侧边栏信息
    sidebar (state) {
        return state.sidebar
    }

})

/*** mutations ***/
let mutations = mutation(state, {

    // fixme: 控制侧边栏
    TOGGLE_SIDEBAR: state => {
        let data = getClientConfig()
        state.sidebar.opened = !state.sidebar.opened
        data.sidebarStatus = state.sidebar.opened
        setClientConfig(data)
    }

})

/*** actions ***/
let actions = action(state, {

    // fixme: 控制侧边栏
    toggleSideBar({ commit }) {
        commit(TOGGLE_SIDEBAR)
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


