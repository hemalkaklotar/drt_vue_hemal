import './assets/main.css'
import router from './router' 
import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css';

const app = createApp(App) 

app.use(router).mount('#app')
