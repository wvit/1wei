import Vue from 'vue';
import ElementUI from 'element-ui';
import VueAreaLinkage from 'vue-area-linkage';
import VueQuillEditor from 'vue-quill-editor'
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/utils';
import '@/axios';
import 'element-ui/lib/theme-chalk/index.css';
import 'vue-area-linkage/dist/index.css';
import '@/assets/css/layout.css';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)
Vue.use(ElementUI)
Vue.use(VueAreaLinkage)
Vue.config.productionTip = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');