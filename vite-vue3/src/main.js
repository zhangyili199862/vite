import { createApp } from 'vue'
import App from './App'

const globModules = import.meta.glob('./glob/*')
Object.entries(globModules).forEach(([k, v]) => {
  v().then((m) => {
    console.log(k + ':' + m.default)
  })
})
console.log(globModules)
createApp(App).mount('#app')
