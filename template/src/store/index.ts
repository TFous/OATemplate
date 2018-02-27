/**
 * Created by wisdom on 2017/12/27.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import { mutation } from './utils/vuexUtil'

// import modules
import app from './modules/app'
import tagsView from './modules/tagsView'
import auth from './modules/auth'
import common from './modules/common'
import setMoney from './modules/setMoney'

Vue.use(Vuex)

let state = {}

let mutations = mutation(state, {})

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',

    state: state,

    mutations: mutations,

    getters: {},

    actions: {},

    modules: {
        common,
        app,
        tagsView,
        auth,
        setMoney
    }
})

export default store
