import { createApp } from 'vue'
import { createPinia } from 'pinia'

import AntDesign from 'ant-design-vue'  // 引入全局包
import 'ant-design-vue/dist/antd.less'  // less
import App from './App.vue'
import router from './router' //路由
import PluginState from 'pinia-plugin-persistedstate'  //pinia持久化插件
import './permission.js'
 //注册持久化插件
const piniaApp = createPinia()
piniaApp.use(PluginState)

const app = createApp(App)
app.use(piniaApp) // 注册pinia
app.use(router)
app.use(AntDesign) // 注册全局组件

app.mount('#app')
