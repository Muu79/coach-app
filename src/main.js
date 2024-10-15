import { createApp } from 'vue';
import router from './router.js';
import store from './store/index.js';
import App from './App.vue';
import BaseComponents from './BaseComponents.js';
const app = createApp(App);

for (const component of BaseComponents) {
    app.component(component.name, component.component);
}

app.use(router);
app.use(store);

app.mount('#app');
