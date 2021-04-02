import Vue from 'vue'

import vuetify from './plugins/vuetify'
import store from './store'
import VuetifyDialog from 'vuetify-dialog'
import App from './App.vue'

import 'vuetify-dialog/dist/vuetify-dialog.css'

Vue.config.productionTip = false

Vue.use(VuetifyDialog, {
    context: {
        store,
        vuetify,
    },
})

new Vue({
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
