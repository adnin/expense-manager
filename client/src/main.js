import { createApp } from 'vue';
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Toaster from '@meforma/vue-toaster';
import App from './App.vue';
import router from './router';
import store from './store';

import './styles/app.css';

createApp(App).use(store).use(router).use(VueLoading).use(Toaster).mount('#app');
