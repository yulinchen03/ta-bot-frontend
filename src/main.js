import './index.css'
import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import router from './router'

const app = createApp(App)
    app.config.globalProperties.$myUrl = 'https://tabot-backend.onrender.com';
    app.use(router)
    app.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

