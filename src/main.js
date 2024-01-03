import { createApp } from 'vue'
import App from './App.vue'
import signalr from './utils/signalR'

const app = createApp(App)
app.config.globalProperties.$signalr = signalr.signal;
app.mount('#app')

