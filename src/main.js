import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { Button, CellGroup, Cell , Field} from 'vant';
// import 'vant/lib/vant-css/index.css';
Vue.use(Button).use(Cell).use(CellGroup).use(Field)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
