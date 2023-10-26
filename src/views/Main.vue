<template lang="pug">
#main(v-if="account")
    .wrap 
        .title Hello, {{ account.name ? account.name : '' }}
        .menuIcons
            RouterLink.material-symbols-outlined.big.icon(:to="{name: 'list'}") subscriptions
            RouterLink.material-symbols-outlined.big.icon(:to="{name: 'mypage'}") face
            .material-symbols-outlined.big.icon(@click="logout") logout
</template>

<script setup>
import { skapi, account } from '@/main';
import { useRoute, useRouter } from 'vue-router';

let route = useRoute();
let router = useRouter();

let logout = async() => {
    skapi.logout().then(() => {
        account.value = null;
    });
    router.replace({ path: '/login' });
}
</script>

<style lang="less" scoped>
#main {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: table;
    background: url(@/assets/login-background.jpg) no-repeat;
    background-size: cover;
}
.wrap {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(30px);
    color: #fff;
}
.title {
    font-size: 1.2em;
    margin-bottom: 2em;
}
.menuIcons {
    .icon {
        display: inline-block;
        text-decoration: none;
        color: #fff;
        margin-right: 1.5em;
        cursor: pointer;

        &:last-child {
            margin-right: 0;
        }
    }
}
</style>