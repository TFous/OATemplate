/**
 * Created by wisdom on 2017/12/26.
 */

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

let SET_COMMON = 'SET_COMMON'

/*** state ***/
let state = {
    layerShow: false, // 次席变更纪录layer
    userMsg: {}
}

/*** getters ***/
let getters = getter(state, {})

/*** mutations ***/
let mutations = mutation(state, {

    SET_COMMON: (state, view) => {
        Object.assign(state, view)
    }
})

/*** actions ***/
let actions = action(state, {

    setcommon({commit, state}, view) {
        commit(SET_COMMON, view)
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


