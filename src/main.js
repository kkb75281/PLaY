import './assets/main.css';

import { createApp, ref } from 'vue';
import { Skapi } from 'skapi-js';
import App from './App.vue';
import router from './router';

const skapi = new Skapi("ap22trXk8XFIOtU7gi5D", "bf305ace-03b5-4f9d-b88f-291458748ca3", { autoLogin : true });
let account = ref(null);

skapi.getProfile().then(u => {
    account.value = u;
    console.log(account.value);

    // if(account.value == null) {
    //     router.replace({ path: '/login' });
    // }
}).catch(err => err);

const app = createApp(App);

app.use(router);

app.mount('#app');

export { skapi, account }