/**
 * Created by wisdom on 2017/12/26.
 */

const SET_TABLE_DATA = 'SET_TABLE_DATA'

const SET_RESTORE_DATA = 'SET_RESTORE_DATA'
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
    tableData: [],
    restoreData: []
}

/*** getters ***/
let getters = getter(state, {
    // fixme: 控制侧边栏信息
    tableData (state) {
        return state.tableData
    },
    restoreData (state){
        return state.restoreData
    }

})

/*** mutations ***/
let mutations = mutation(state, {

    // fixme: 控制侧边栏
    SET_TABLE_DATA: (state, tableData) => {
        state.tableData = tableData
    },
    SET_RESTORE_DATA: (state, restoreData) => {
        state.restoreData = restoreData
    }
})

/*** actions ***/
let actions = action(state, {

    setTableData ({ commit, state }, tableData) {
        commit(SET_TABLE_DATA, tableData)
    }
    ,
    setRestoreData ({ commit, state }, restoreData) {
        commit(SET_RESTORE_DATA, restoreData)
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
