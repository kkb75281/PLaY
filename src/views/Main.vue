<template lang="pug">
#main
    .wrap 
        img(src="@/assets/headset.png")
        p.desc PLaY supports artists with tools to create, release, and measure music across a global stage.
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
// .wrap {
//     max-width: 1280px;
//     margin: 0 auto;
// }
#main {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: table;
    // background: url(@/assets/login-background.jpg) no-repeat;
    // background-size: cover;
}
.wrap {
    display: table-cell;
    vertical-align: middle;
    // text-align: center;
    // background-color: rgba(0, 0, 0, 0.1);
    // backdrop-filter: blur(30px);
    // color: #fff;
}
// .title {
//     font-size: 1.2em;
//     margin-bottom: 2em;
// }
// .menuIcons {
//     .icon {
//         display: inline-block;
//         text-decoration: none;
//         color: #fff;
//         margin-right: 1.5em;
//         cursor: pointer;

//         &:last-child {
//             margin-right: 0;
//         }
//     }
// }
</style>