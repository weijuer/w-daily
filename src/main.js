import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { Pin, LoadMore } from './directives';
// 全局引入样式文件
import 'w-design-vue/lib/style.css';
import wd from 'w-design-vue';

// import './worker/db_worker';

// import 'Utils/dailyUtils';

// 创建Vue应用，
const app = createApp(App);
// 注册插件
app.use(router);
app.use(store);
// 使用w-design-vue
app.use(wd);
// 注册全局指令
app.directive('pin', Pin);
app.directive('loadmore', LoadMore);
// 挂载Vue应用
app.mount('#app');
