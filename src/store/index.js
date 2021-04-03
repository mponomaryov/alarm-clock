import Vue from 'vue'
import Vuex from 'vuex'

import alarms from './alarms'
import settings from './settings'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        alarms,
        settings,
    },
})

export default store
