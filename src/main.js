import './assets/main.css';

import { createApp, ref } from 'vue';
import { Skapi } from 'skapi-js';
import App from './App.vue';
import router from './router';

const skapi = new Skapi("ap22soAoy2m49BwrpgUH", "524ddf44-d09b-4f1c-a152-35f3d5acfa77", { autoLogin : true });
let account = ref(null);

skapi.getProfile().then(u => {
    account.value = u;
    console.log(account.value);

    if(account.value == null) {
        router.replace({ path: '/login' });
    }
}).catch(err => err);

const app = createApp(App);

app.use(router);

app.mount('#app');

export { skapi, account }