import { createApp } from 'vue'
import { createPinia } from 'pinia'

import AntDesign from 'ant-design-vue'  // 引入全局包
import 'ant-design-vue/dist/antd.less'  // less - css的预处理器 可以写嵌套语法 可以写变量
import App from './App.vue'
import router from './router'
import PluginState from 'pinia-plugin-persistedstate'
 //注册持久化插件
const piniaApp = createPinia()
piniaApp.use(PluginState)

const app = createApp(App)
app.use(piniaApp) // 注册pinia
app.use(router)
app.use(AntDesign) // 注册全局组件

app.mount('#app')
