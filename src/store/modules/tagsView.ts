/**
 * Created by wisdom on 2017/12/27.
 */
const ADD_VISITED_VIEWS = 'ADD_VISITED_VIEWS'
const DEL_VISITED_VIEWS = 'DEL_VISITED_VIEWS'
const DEL_OTHERS_VIEWS = 'DEL_OTHERS_VIEWS'
const DEL_ALL_VIEWS = 'DEL_ALL_VIEWS'
const DEL_ROLE_VIEWS = 'DEL_ROLE_VIEWS'

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
    visitedViews: [],
    cachedViews: []
}

/*** getters ***/
let getters = getter(state, {
    visitedViews: state => state.visitedViews,
    cachedViews: state => state.cachedViews
})

/*** mutations ***/
let mutations = mutation(state, {

    ADD_VISITED_VIEWS: (state, view) => {
        let isExist = false
        state.visitedViews.forEach(function (item, key) {

            // 如果name 更改名字随之更改
            if (item.path === view.path) {
                state.visitedViews[key].query = view.query
                if (view.query.Name) {
                    state.visitedViews[key].title = `(${view.query.Name})${view.meta.title}`
                }
                isExist = true
                return
            }
        })
        if (isExist) return


        let obj = {}
        obj.name = view.name
        obj.path = view.path
        obj.params = view.params
        obj.query = view.query
        obj.title = view.meta.title
        if (view.query.Name) {
            obj.title = `(${view.query.Name})${view.meta.title}`
        }
        if (!view.meta.title) {
            obj.title = 'no-name'
        }
        state.visitedViews.push(obj)
        if (!view.meta.noCache) {
            state.cachedViews.push(view.name)
        }
    },
    DEL_VISITED_VIEWS: (state, view) => {
        state.visitedViews.forEach(function (v, i) {
            if (v.path === view.path) {
                state.visitedViews.splice(i, 1)
            }
            return
        })
        for (const i of state.cachedViews) {
            if (i === view.name) {
                const index = state.cachedViews.indexOf(i)
                state.cachedViews.splice(index, index + 1)
                break
            }
        }
    },
    DEL_ROLE_VIEWS: (state, view) => {
        state.visitedViews.forEach(function (v, i) {
            if (v.path === view.path) {
                state.visitedViews.splice(i, 1)
            }
            return
        })
        for (const i of state.cachedViews) {
            if (i === view.name) {
                const index = state.cachedViews.indexOf(i)
                state.cachedViews.splice(index, index + 1)
                break
            }
        }
    },
    DEL_OTHERS_VIEWS: (state, view) => {
        state.visitedViews.forEach(function (v, i) {
            if (v.path === view.path) {
                state.visitedViews = state.visitedViews.slice(i, i + 1)
            }
            return
        })
        for (const i of state.cachedViews) {
            if (i === view.name) {
                const index = state.cachedViews.indexOf(i)
                state.cachedViews = state.cachedViews.slice(index, i + 1)
                break
            }
        }
    },
    DEL_ALL_VIEWS: (state) => {
        state.visitedViews = []
        state.cachedViews = []
    }

})

/*** actions ***/
let actions = action(state, {

    addVisitedViews({ commit }, view) {
        commit(ADD_VISITED_VIEWS, view)
    },
    delVisitedViews({ commit, state }, view) {
        return new Promise((resolve) => {
            commit(DEL_VISITED_VIEWS, view)
            resolve([...state.visitedViews])
        })
    },
    delRoleViews({ commit, state }, view) {
        return new Promise((resolve) => {
            commit(DEL_ROLE_VIEWS, view)
            resolve([...state.visitedViews])
        })
    },
    delOthersViews({ commit, state }, view) {
        return new Promise((resolve) => {
            commit(DEL_OTHERS_VIEWS, view)
            resolve([...state.visitedViews])
        })
    },
    delAllViews({ commit, state }) {
        return new Promise((resolve) => {
            commit(DEL_ALL_VIEWS)
            resolve([...state.visitedViews])
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